import News from '../components/News';
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

const	makeSubject = (title, location, source, date, type, href, number) => {
	const display = title || [source, typeToDisplay(type), location].filter(x => x).join(' - ');
	return <>
		<a href={`${href}?addendum=${number + 1}`}>{display}</a>
		{date && <span className="date ago">{displayDate(date)}</span>}
	</>
}

const makeContact = (authorContact) => {
	if (authorContact) {
		const ret = authorContact.match(/@/) ? `mailto:${authorContact}` : authorContact;
		return <span className="contact">
			<a href={ret} target="new">{authorContact}</a>
		</span>;
	}
}

const makeAuthor = (author, authorContact) => {
	return <>{author}{makeContact(authorContact)}</>
}

const makeDate = (date) => {
	if (date) {
		const ret = new Date(date).toISOString().slice(0,10);
		const Difference_In_Time = new Date().getTime() - new Date(date).getTime();
		const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		const Difference_In_Years = Difference_In_Days / (365.25);

		const ago = ((Difference_In_Years > 1) ? `${Math.floor(Difference_In_Years)} yrs` : `${Math.ceil(Difference_In_Days)} days`) + ` ago`;
		return <div className="date">{ret}<span className="date ago">{ago}</span></div>
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

const Addendum = ({ location, original, source, credit, date, type, author, authorContact, title, body, releaseLink, number }) => (
	<>
		{makeSubject(title, location, source, date, type, releaseLink, key)}
		{makeBody(body)}
		{makeAuthor(author, authorContact)}
		{makeDate(date)}
		{makeOriginal(original)}
	</>
)

const cleanName = (value) => value.replace(/['"?,/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_");

const makeReleaseLink = (artist, title) => `${cleanName(artist)}-${cleanName(title)}`;

const makeAlbumBlurb = (item, key) => {
	const href = makeReleaseLink(item.artist, item.title);

	return <a className="cover" key={key} href={`/releases/${href}`}><img
		border="1" src={`http://700west.com/images/covers/${item.image[0].thumb}`}
		alt={`${item.artist} - ${item.image[0].name}`}
		width={item.image[0].width}
		height={item.image[0].height} /></a>
}

const Albums = () => (
	<>
	{/*<News slug="bandcampRelease" />*/}
	<p>
		Between 1972 and 1983, several singles and albums were released on the 700 West label.
	</p>
	<p>
		Many releases were recorded at the studio and released on other labels.
	</p>
	<p>
		Today, many of these records sell amongst collectors for hundreds of dollars!
	</p>
	<p>
		We're currently working on tizing and re-releasing some 700 West material.
	</p>
	<p>
		Get in <a href="/contact">touch with us</a> if you have specific requests.
	</p>
	<SectionHeader text="Click for more information" />
	<ul className="albums">
		{releases.filter(r => r.type === 'album').map(makeAlbumBlurb)}
	</ul>
	</>
)

export default Albums;
