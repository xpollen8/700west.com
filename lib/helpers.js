const cleanName = (value) => value.replace(/["?'/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_").replace(/__/g, '_').replace(/_$/, '');

import { isRelease, AudioPlayer, AKAs, getAlbumNames, getMusicianNames, getBandNames } from '../components/Muso';
const makeBandLink = (band) => `/band/${cleanName(band)}`;
const makeMusicianLink = (musician) => `/musician/${cleanName(musician)}`;
const makeReleaseLink = (artist='', title='') => `/releases/${cleanName(artist)}-${cleanName(title)}`;
const maybeReleaseLink = (artist='', title='') => {
	if (!isRelease(artist, title)) return <><b>{artist}</b> - {title}</>;
	return (
		<a href={`${makeReleaseLink(artist, title)}`}><b>{artist}</b> - {title}</a>
	)
}

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

const	makeSubject = ({ author, title, location, source, date, type, href, number }) => {
	
	const display = title ? [author, title].filter(x => x).join(' - ') : [author, source, location].filter(x => x).join(' - ');
	return display;
		//<a href={`${href}?addendum=${number + 1}`}>{display}</a>
		{/* BOMBS IN PRODUCTION date && displayDate(date) */}
}

const FormatDate = (date = new Date()) => new Date(date).toISOString().slice(0,10);

const makeDate = (date) => {
	if (date) {
		try {
		const ret = FormatDate(date);
		const Difference_In_Time = new Date().getTime() - new Date(date).getTime();
		const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		const Difference_In_Years = Difference_In_Days / (365.25);

		if (Math.floor(Difference_In_Days) > 0) {
			const ago = ((Difference_In_Years > 1) ? `${Math.floor(Difference_In_Years)} yrs` : `${Math.floor(Difference_In_Days)} days`) + ` ago`;
			return <span className="date">{ret}<span className="date ago">{ago}</span></span>
		} else {
			return <span className="date ago">{ret}</span>
		}
		} catch {
			return date;
		}
	}
}

const Item = ({ children, bold, author, info, date, body, extra, lyrics, audio }, key) => (
	<div className="row" key={key}>
		{bold && <div className="artist">
			<b>{bold}</b>
		</div>}
		{info && <div>
			{info}
		</div>}
		{author && date && <div>
			{author} - {makeDate(date)}
		</div>}
		{date && !author && <div>
			{makeDate(date)}
		</div>}
		{extra && <>
			{extra}
		</>}
		{audio && <AudioPlayer mp3={audio} date={date}/>}
		{body && <blockquote>
			<div dangerouslySetInnerHTML={{ __html: getBodyHTML(body) }}></div>
		</blockquote>}
		<Lyrics lyrics={lyrics} />
	</div>
)

const Topper = ({ className, text }) => <div className={className}>&lt;&lt; {text} &gt;&gt;</div>

const SectionHeader = ({ text }) => <Topper className="sectionHeader" text={text} />

const makeAuthor = (author, authorContact) => {
	const makeContact = (authorContact) => {
		if (authorContact) {
			const ret = authorContact.match(/@/) ? `mailto:${authorContact}` : authorContact;
			return <span className="contact">
				<a href={ret} target="new">{authorContact}</a>
			</span>;
		}
	}
	if (authorContact) {
		return <>
			{author} {makeContact(authorContact)}
		</>
	} else {
		return author;
	}
}

const makeSource = (source) => {
	if (source) {
		return <span className="source">({source})</span>
	}
	return <></>
}

const dateCompare = (a, b) => {
	return new Date(a.published || '1900-01-01') - new Date(b.published || '1900-01-01');
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
const autoLinkList = lizt.sort((a, b) => b.orig.length - a.orig.length);

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
					const regex = RegExp(`(\\b${orig}\\b)`, 'g');
					str = str.replaceAll(regex, `<a href="${subt}">${orig}</a>`);
				});
				return str;
			}
		}
	});
	return res.join('');
}

const getBodyHTML = (body = '') => (body?.props?.children) ? body.props.children : autoLink(body);

const Lyrics = (item) => {
	if (item.lyrics) {
		return (<blockquote><pre className="row lyrics"><div className="title">Lyrics</div>{item.lyrics.replace(/\t/g, '')}</pre></blockquote>)
	}
}

export { maybeReleaseLink, autoLink, Lyrics, getBodyHTML, Topper, SectionHeader, makeMusicianLink, makeReleaseLink, typeToDisplay, makeSubject, FormatDate, makeDate, Item, makeAuthor, dateCompare, makeBandLink, makeSource };
