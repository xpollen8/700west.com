import { Page } from '../pages/_app';
import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';

const FormatDate = (date = new Date()) => {
	const dt = new Date(date).toISOString().slice(0,10);
	return <>{dt}</>
}

const typeToDisplay = (type) => {
	const	types = [
		[ 'interview', 'Interview' ],
		[ 'liner', 'Liner Notes' ],
		[ 'auction', 'Auction Review' ],
		[ 'review', 'Review' ],
		[ 'session', 'Session Notes' ],
		[ 'reminiscence', 'Reminiscence' ],
		[ 'photos', 'Photographs' ],
	];
	const item = types.find(t => t[0] === type);
	return (item) ? item[1] : '';
}

const displayDate = (date) => {
	if (date) {
		return new Date(date).toISOString().slice(0,10);
	}
}

const	makeSubject = (props) => {
	const { title, location, source, type } = props;
	const display = title || [source, typeToDisplay(type), location].filter(x => x).join(' - ');
	return display;
}

const makeContact = (authorContact) => {
	if (authorContact) {
		const ret = authorContact.match(/@/) ? `mailto:${authorContact}` : authorContact;
		return <span className="contact">
			<a href={ret} target="new">{authorContact}</a>
		</span>;
	}
}

const makeDate = (date) => {
	if (date) {
		const ret = new Date(date).toISOString().slice(0,10);
		const Difference_In_Time = new Date().getTime() - new Date(date).getTime();
		const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		const Difference_In_Years = Difference_In_Days / (365.25);

		const ago = ((Difference_In_Years > 1) ? `${Math.floor(Difference_In_Years)} yrs` : `${Math.ceil(Difference_In_Days)} days`) + ` ago`;
		return <span className="date">{ret}<span className="date ago">{ago}</span></span>
	}
}

const makeBody = (body) => {
	if (body) {
		return <>{body}</>
	}
}

const makeOriginal = (original) => {
	if (original) {
		return <div className="original">
			Swiped from:
			<a href={original} target="new">{original}</a>
		</div>
	}
}

const Addendum = ({ location, original, source, credit, date, type, author, authorContact, title, body, artist, release, releaseLink, number }) => (
	<>
		<div className="header">
		<div className="artist">{artist}</div>
		:
		<a href={releaseLink} className="title">{release}</a>
		<hr/>
		{source && <div>Source: <div className="datum">{source}</div></div>}
		{location && <div>Location: <div className="datum">{location}</div></div>}
		{type && <div>Type: <div className="datum">{typeToDisplay(type)}</div></div>}
		{author && <div>Author: <div className="datum">{author}{makeContact(authorContact)}</div></div>}
		{date && <div>Published: <div className="datum">{makeDate(date)}</div></div>}
		{makeOriginal(original)}
		</div>
		<hr/>
		{title &&
			<div className="subject">
				{title}
			</div>
		}
		{makeBody(body)}
	</>
)

const cleanName = (value) => value.replace(/['"?,/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_");

const makeReleaseLink = (artist, title) => `${cleanName(artist)}-${cleanName(title)}`;

const makeAlbumBlurb = (item, key) => {
	const href = makeReleaseLink(item.artist, item.title);

	return <a className="cover" key={key} href={href}><img
		border="1" src={`/images/covers/${item.image[0].thumb}`}
		alt={`${item.artist} - ${item.image[0].name}`}
		width={item.image[0].width}
		height={item.image[0].height} /></a>
}

const makeAddendum = (item, addendum) => {
	const add = item.addendum && item.addendum.find((x, i) => i === addendum - 1);
	const link = (item.type === 'album') ? 'albums' : 'singles';
	const artist = item.artist || item.tracks[0].artist;
	const release = item.title || item.tracks[0].title;
		

	return <Page title="Releases" link={link} description={makeSubject(add)} >
		{add && <Addendum {...add} artist={artist} release={release} releaseLink={makeReleaseLink(artist, release)} number={addendum} />}
	</Page>
}

const makeRelease = (item, title) => {
	return <>
		{title}
	</>
}

const Release = ({ url, addendum }) => {
	const item = releases.find(r => url === makeReleaseLink(r.artist || r.tracks[0].artist, r.title || r.tracks[0].title));
	if (addendum) {
		return makeAddendum(item, addendum)
	} else {
		return makeRelease(item)
	}
}

export default Release
