import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';
import { makeReleaseLink } from '../lib/helpers';

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

const AddendumItem = (item, key) => {
	const data = {
		artist: item.artist || item.tracks[0].artist,
		title: item.title || item.tracks[0].title,
	};
	data.releaseLink = makeReleaseLink(data.artist, data.title);

	return <li className="addendum" key={key}>
		<>
			<span className="addendum artist">
				{data.artist}
			</span>
			<span className="addendum title">
				<a href={data.releaseLink }>{data.title}</a>
			</span>
			<span className="date ago">
				{item.published}
			</span>
		</>
		<ul>
			{item.addendum.map(({ location, original, source, credit, date, type, author, authorContact, title, body }, key2) => (
					<li className="addendum subject" key={key2}>
						{title}{location}{source}{date}{type}{data.releaseLink}{key2}
						{/*makeSubject(title, location, source, date, type, data.releaseLink, key2)*/}
					</li>
				)
			)}
		</ul>
	</li>
}

const Extras = (props) => (
	<ul className="addendums">
		{releases.filter(r => r.addendum && r.addendum.length).map(AddendumItem)}
	</ul>
)

export default Extras;
