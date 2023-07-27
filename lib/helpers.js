const cleanName = (value) => value.replace(/["?'/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_").replace(/__/g, '_').replace(/_$/, '');

import { AudioPlayer, AKAs, getAlbumNames, getMusicianNames, getBandNames } from '../components/Muso';
const makeBandLink = (band) => `/band/${cleanName(band)}`;
const makeMusicianLink = (musician) => `/musician/${cleanName(musician)}`;
const makeReleaseLink = (artist='', title='') => `/releases/${cleanName(artist)}-${cleanName(title)}`;

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

const doLink = (str, candidate, url) => {
	if (!str.includes(candidate)) return str;	// no need to use regex
	const pattern = new RegExp(`(?!<[^>]*>)(\\w+|[',.])*(${candidate})(\\w+|[',.])(?![^<]*>)`, 'g');
	//console.log(candidate);
	let matchedText = candidate;
	let match;
	if ((match = pattern.exec(str)) !== null) {
		matchedText = match[0];
	}
	return str.replaceAll(pattern, `<a href=${url}>${matchedText}</a>`);
}

const autoLink = (str = '') => {
	const musicians = getMusicianNames();
	const bands = getBandNames();
	const lps = getAlbumNames();
	musicians.forEach(m => {
		const link = makeMusicianLink(m);
		const aliases = AKAs[m] || [ m ];
// OLD
//-               aliases.forEach(a => {
//-                       // match whitespace-delimited strings
//-                       // do not match inside HTML tags
//-                       const regex = new RegExp(`(?!<[^>]*>)(?:\\s+|[',.])*${m}(?:\\s+|[',.])(?![^<]*>)`, 'g');
//-                       str = str.replace(regex, ` <a href=${makeMusicianLink(m)}>${a}</a> `);
//-               });
//
		let found = 0;
		aliases
			.sort((a, b) => b.length - a.length)
			.forEach(a => {
				if (found) return;
				const repl = doLink(str, a, link);
				if (str !== repl) {
					str = repl;
					found = 1;	// abort after first match
				}
			});
	});
	let found = 0;
	/*
	bands.forEach(b => {
// OLD
//-               const regex = new RegExp(`(?!<[^>]*>)(\\s+|[',.])*(${b})(\\s+|[',.])(?![^<]*>)`, 'g');
//-               str = str.replace(regex, ` <a href=${makeBandLink(b)}>${b}</a> `);
//
		if (found) return;
		const repl = doLink(str, b, makeBandLink(b));
		if (str !== repl) {
			str = repl;
			found = 1;	// abort after first match
		}
	});
	*/
	found = 0;
	lps.forEach(({ artist, title }) => {
// OLD
//               const regex = new RegExp(`(?!<[^>]*>)(\\s+|[',.])*(${title})(\\s+|[',.])(?![^<]*>)`, 'g');
//               str = str.replace(regex, ` <a href=${makeReleaseLink(artist, title)}>${title}</a> `);
//
		if (found) return;
		const repl = doLink(str, title, makeReleaseLink(artist, title));
		if (str !== repl) {
			str = repl;
			found = 1;	// abort after first match
		}
	});
	return str;
}

const getBodyHTML = (body = '') => (body?.props?.children) ? body.props.children : autoLink(body);

const Lyrics = (item) => {
	if (item.lyrics) {
		return (<blockquote><pre className="row lyrics"><div className="title">Lyrics</div>{item.lyrics.replace(/\t/g, '')}</pre></blockquote>)
	}
}

export { autoLink, Lyrics, getBodyHTML, Topper, SectionHeader, makeMusicianLink, makeReleaseLink, typeToDisplay, makeSubject, FormatDate, makeDate, Item, makeAuthor, dateCompare, makeBandLink, makeSource };
