import Link from 'next/link';
import releases from './releases';
import AKAs from './AKAs';
import MakeDate from '../components/MakeDate';

const cleanName = (value) => value?.replace(/["?'/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_").replace(/__/g, '_').replace(/_$/, '');

const exists = (v) => v && v.length;

const smartLink = (v) => {
	if (typeof v === 'string' && v?.includes('http')) {
		return <Link href={v} target="new">{v}</Link>
	}
	return v;
}

const Datum = ({ k, v, className }) => {
	if (exists(v) || typeof v === 'object') {
		return <div>
			<span className="datum"> {k} </span>:
			<span className={className}> {smartLink(v)} </span>
		</div>
	}
	return <>{v}</>
}

const showAttribution = (attr, className) => {
	const { original, who, date, added } = attr || {};
	if (!(original || who || date)) return <></>;
	return (
		<div className={`${className} attribution`}>
			{exists(date) && MakeDate(date)}
			<Datum k="Source" v={original} />
			{who && <Datum k="Author" v=<Who who={who} /> />}
			{added && <Datum k="Added" v={MakeDate(added)} />}
		</div>
	);
}

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
	return hasAKA;
}

const makeBandLink = (band) => `/band/${cleanName(band)}`;
const makeMusicianLink = (musician) => `/musician/` + cleanName(isAKA(musician));
//const makeMusicianLink = (musician) => `/musician/${cleanName(musician)}`;
const makeReleaseLink = (artist='', title='') => `/release/${cleanName(artist)}-${cleanName(title)}`;

const typeToDisplay = (type) => {
	const	types = [
		[ 'interview', 'Published Interview' ],
		[ 'liner', 'Liner Note' ],
		[ 'auction', 'Auction Detail' ],
		[ 'review', 'Album Review' ],
		[ 'session', 'Session Note' ],
		[ 'reminiscence', 'Reminiscence' ],
		[ 'photos', 'Photograph' ],
	];
	const item = types.find(t => t[0] === type);
	return (item) ? item[1] : '';
}

const dateCompare = (a, b) => {
	return new Date(a.published || '1900-01-01') - new Date(b.published || '1900-01-01');
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

const	getBandNames = () => {
	const X = [].concat(...releases.map(r => {
		const trackArtists = r?.tracks?.map(t => t.artist);
		return [ r?.artist ].concat(trackArtists);
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const musicians = getMusicianNames();
const bands = getBandNames();
const lps = getAlbumNames();
const lizt = [];

// pre-build all possible permutations of string -> expansion
const maybeAdd = (orig, subt) => {
	if (!lizt.find(l => l.orig === orig)) lizt.push({ orig, subt });
}

musicians.forEach(m => {
	const link = makeMusicianLink(m);
	const aliases = AKAs[m] || [ m ];
	aliases.forEach(a => {
		maybeAdd(a, link);
	});
});

bands.forEach(b => {
	maybeAdd(b, makeBandLink(b));
});

lps.forEach(({ artist, title }) => {
	maybeAdd(title, makeReleaseLink(artist, title));
});

// now sort
const autoLinkList = lizt.sort((a, b) => b.orig?.length - a.orig?.length);

const autoLink = (str, ignore = false) => _autoLink(autoLinkList, str, ignore);
	
const _autoLink = (subs, str, ignore = false) => {
	const arr = str.split(/(<a href=)|(<\/a>)/).filter(f => f);

	const res = arr.map(str => {
		if (ignore) {
			if (str.includes('</a>')) {
				ignore = false;
				return str;
			} else {
				// inside <>
				return str;
			}
		} else {
			if (str.includes('<a href=')) {
				ignore = true;
				return str;
			} else {
				// do the sub
				subs.forEach(({ orig, subt }) => {
					//const regex = RegExp(`(\\b${orig}\\b)`, 'g');
					//str = str.replaceAll(regex, `<a href="${subt}">${orig}</a>`);
					str = str.replace(RegExp(`\\b${orig}\\b`), `<a href="${subt}">${orig}</a>`);
				});
				return str;
			}
		}
	});
	return res.join('');
}

const getBodyHTML = (body = '') => (body?.props?.children) ? body.props.children : autoLink(body);


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
				artist: (r.type !== 'single') ? r.artist : r.artist || r.tracks[0]?.artist,
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
			artist: (r.type !== 'single') ? r.artist : r.artist || r.tracks[0]?.artist,
			title: (r.type !== 'single') ? r.title : r.tracks[0]?.title,
			type: r.type,
			roles: [ 'Writer' ],
		})).filter(f => f) || [];

		return releases.concat(...tracks, ...writers);
	}));
	const ret = [];
	uniqueReleases.filter(f => f).forEach(({ artist, title, type, roles }) => {
		const existing = ret.find(u => u.artist === artist && u.title == title && u.type === type) | [];
		if (existing) { // combine onto existing roles
			existing.roles = [...new Set (existing.roles.concat(roles))];
		} else {
			ret.push({ artist, title, type, compilation: (artist === 'Various Artists'), roles });
		}
	});
	const deduped = [];
	for (let i in ret) {
		const { artist, title, type } = ret[i];
		deduped[ artist + title + type ] = ret[i];
	}
	const reallyRet = [];
	for (let i in deduped) {
		reallyRet.push(deduped[i]);
	}
	return reallyRet?.sort((a, b) => ('' + a.artist).localeCompare(b.artist))
}

const knownForsByMusician = (mus) => {
	let known;
	releases.forEach(r => !known && r?.credits?.filter(t => {
		if (t?.who && t?.knownFor && isAKA(t?.who) === mus && t?.knownFor) {
			known = t.knownFor;
		}
	}));
	return known;
}

const commentsByMusician = (mus) => {
	const comments = [];
	releases.forEach(r => {
		r?.comments?.forEach(c => {
			if (isAKA(c.who) === mus) {
				comments.push({ release: r, comment: c });
			}
		})
		r?.tracks.forEach(t => {
			t?.comments?.forEach(c => {
				if (isAKA(c.who) === mus) {
					comments.push({ release: r, track: t, comment: c });
				}
			})
		})
	});
	return comments;
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

export { autoLink, getBodyHTML, makeReleaseLink, typeToDisplay, dateCompare, makeBandLink };
export { isRelease, getReleasedBandNames, getAlbumNames, publicityByBand, getMusicianNames, commentsByMusician, releasesByMusician, knownForsByMusician, musiciansByBand, releasesByBand, AKAs, getBandNames, makeMusicianLink, cleanName, isAKA }
export { Datum, showAttribution };

