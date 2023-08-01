import releases from '../lib/releases';
import { getBodyHTML } from '../lib/helpers';

const cleanName = (value) => value.replace(/["?'/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_").replace(/__/g, '_').replace(/_$/, '');
const makeMusicianLink = (musician) => `/musician/` + cleanName(isAKA(musician));

const AKAs = {
	'Robert Williams': [ 'Bob WIlliams' ],
	'Gary Brewer': [ 'Gary Lee Brewer' ],
	'Jason Seidler': [ 'Jason Stonewall' ],
	'M.J. Whittemore, Jr.': [ 'Mo Whittemore', 'Mo Wittemore*', 'Moe Whittemore', 'M. Whittemore Jr', 'M. Whittemore', 'Maurice James Whittemore, Jr.', 'Moe Whittimore', 'Moe', 'Mo' ],
	'Jay Wilfong': [ 'Jay Wilfong', 'William Bonney' ],
	'Arthur Swords': [ 'Shanty' ],
	'Carlos Silva': [ 'Silva' ],
	'Dan Gustin': [ 'Danny Gustin' ],
	'Dave Zerfas': [ 'David Zerfas' ],
	'James Massie': [ 'Red Massie' ],
	'Jack Schaefele': [ 'Jack Schafele', 'Jack Schfele' ],
	'Boobie Townsend': [ 'Master "Boobie" Townsend' ],
	'Jim Hubler': [ 'W. J. Hubler, Jr.' ],
};

const isAKA = (name = '') => {
	const hasAKA = Object.keys(AKAs).find(a => {
		if (a === name) return name;
		const fnd = AKAs[a]?.find(aka => {
			if (name.match('ittemore')) {
			//console.log("COMP", aka, name, aka.toLowerCase() === name.toLowerCase());
			}
			return cleanName(aka.toLowerCase()) === cleanName(name.toLowerCase())
		});
		return fnd;
	}) || name;
			if (name.match('ittemore')) {
	//console.log("isAKA", { name, hasAKA });
	}
	return hasAKA;
}

const releasesByMusician = (mus) => {
	const uniqueReleases = [].concat(...releases.map(r => {
		const releases = r?.credits?.filter(c => isAKA(c.who) === mus)?.map(c => {
			return ({
				artist: (r.type !== 'single') ? r.artist : `${r.artist || r.tracks[0]?.artist}`,
				title: (r.type !== 'single') ? r.title : `${r.title || r.tracks[0]?.title}`,
				type: r.type,
				roles: c?.did,
			})
		}).filter(f => f) || [];
		const tracks = r?.tracks.map(t => t?.credits?.filter(c => isAKA(c.who) === mus)?.map(c => {
			return ({
				artist: (r.type !== 'single') ? r.artist : r.tracks[0]?.artist,
				title: (r.type !== 'single') ? r.title : r.tracks[0]?.title,
				type: r.type,
				roles: c?.did,
			})
		})).filter(f => f) || [];
		const writers = r?.tracks.filter(t => {
			if (!t.writer) return false;
			// are any aliases found in the writers string?
			const aliases = AKAs[mus] || [];
			return [ mus, ...aliases].find(a => t.writer.includes(a));
		}).filter(f => f).map(t => ({
			artist: (r.type !== 'single') ? r.artist : r.tracks[0]?.artist,
			title: (r.type !== 'single') ? r.title : r.tracks[0]?.title,
			type: r.type,
			roles: [ 'Writer' ],
		})).filter(f => f) || [];

		return releases.concat(...tracks, ...writers);
	}));
	const ret = [];
	uniqueReleases.filter(f => f).forEach(({ artist, title, type, roles }) => {
		const existing = ret.find(u => u.artist === artist && u.title == title && u.type === type);
		if (existing) { // combine onto existing roles
			existing.roles = [...new Set (existing.roles.concat(roles))];
		} else {
			ret.push({ artist, title, type, compilation: (artist === 'Various Artists'), roles });
		}
	});
	return ret.sort((a, b) => ('' + a.artist).localeCompare(b.artist))
}

const commentsByMusician = (mus) => {
	const comments = [];
	releases.forEach(r => {
		r?.tracks.forEach(t => {
			t?.comments?.forEach(c => {
				if (isAKA(c.who) === mus) {
					comments.push({ release: r, track: t, comment: c });
				}
			})
		})
	});
console.log("comments", comments);
	return comments;
}

const getAlbumNames = () => releases.filter(r => r?.type === 'album');

const	getMusicianNames = () => {
	const uniqueNames = [].concat(...releases.map(r => {
		const credits = r?.credits?.map(c => c.who) || [];
		const tracksCredits = r?.tracks.map(t => t?.credits?.map(c => c.who)) || [];
		return credits.concat(...tracksCredits).filter(f => f);
	}));
	return uniqueNames.map(n => isAKA(n)).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const isRelease = (artist, title) => {
	return releases.find(r => {
		if (r.type === 'single') {
			return r.tracks[0]?.artist === artist && r.tracks[0]?.title === title;
		} else {
			return r.artist === artist && r.title === title;
		}
	});
}

const	getReleasedBandNames = () => {
	const X = [].concat(...releases.map(r => {
		return [ r?.artist ];
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const	getBandNames = () => {
	const X = [].concat(...releases.map(r => {
		const trackArtists = r?.tracks?.map(t => t.artist);
		return [ r?.artist ].concat(trackArtists);
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const	releasesByBand = (band) => {
	const X = [].concat(...releases.filter(r => {
		if (r?.artist === band) { return true };
		if (r?.tracks?.filter(t => t.artist === band)?.length) { return true };
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const musiciansByBand = (band) => {
	const onReleases = releasesByBand(band);
	const X = [].concat(...onReleases.map(r => {
		const credits = r?.credits?.map(c => c.who) || [];
		const tracksCredits = [];
		r?.tracks?.forEach(t => {
			if (t?.artist === band) {
				const c = t?.credits?.map(c => c.who) || [];
				tracksCredits.push(...c);
			}
		});
		return credits.concat(...tracksCredits).filter(f => f);
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const publicityByBand = ({ band }) => {
	const X = releases.filter(r => {
		const inArtist = r?.artist === band;
		const inSingle = r?.type === 'single' && r?.tracks?.filter(t => {
			return t?.artist === band
		})?.length;
		return (inArtist || inSingle) && r?.publicity?.length;
	});
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const AudioPlayer = (props) => {
	const GetTitle = ({ title, band, href, audio, mp3, author, comment, date, time }) => {
		const getT = (band, title) => {
			if (band || title) {
				return <>
					<div className="title">
						{band && <b>{band} - </b>}
						{title && <i>{title}</i>}
						{time && <span className="date ago">{time}</span> }
					</div>
					<div className="details">
						{author && <>({author})</> }
						{date && <>({date})</> }
					</div>
				</>
			} else {
				return <></>
			}
		}
		if (audio && href) {
			return <a href={href}>{getT(band, title)}</a>
		}
		return getT(band, title)
	}
	const GetComment = ({ comment, comments }) => {
		if (comments && comments.length) {
			const { said, who } = comments[0];
			return (
				<div className='details'>
					<div dangerouslySetInnerHTML={{ __html: getBodyHTML(said) }}></div>
					<div className="who">{who}</div>
				</div>)
		}
		if (comment && comment.length) {
			return (
				<div className='details'>
					<div dangerouslySetInnerHTML={{ __html: getBodyHTML(comment) }}></div>
				</div>)
		}
		return <>
		</>
	}
	const GetPlayer = ({ title, band, href, audio, mp3, author, comment, date, time, comments }) => {
		const useAudio = audio || mp3 || '';
		const useSrc = useAudio.startsWith('https://') ? useAudio : `/audio/${useAudio}`;
		return (
			<div>
				<GetTitle {...props} />
				<audio controls="controls" title={title} preload="none" className="audio">
					<source src={useSrc} type="audio/mpeg" />
				</audio>
				<GetComment comment={comment} comments={comments} />
			</div>
		)
	}

	return(
		<div className="player">
			<GetPlayer {...props} />
		</div>
	);
};

export { isRelease, getReleasedBandNames, getAlbumNames, AudioPlayer, publicityByBand, getMusicianNames, commentsByMusician, releasesByMusician, musiciansByBand, releasesByBand, AKAs, getBandNames, makeMusicianLink, cleanName, isAKA }
