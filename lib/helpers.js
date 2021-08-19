const cleanName = (value) => value.replace(/["?'/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_");

const makeReleaseLink = (artist, title) => `/releases/${cleanName(artist)}-${cleanName(title)}`;

const AudioPlayer = (props) => {
	const getTitle = ({ title, band, href, audio, mp3, author, comment, date, time }) => {
		const getT = () => {
			if (band || title) {
				return <>
				<div className="title">
					{band && <b>{band} - </b>}
					{title && <i>{title}</i>}
					{time && <span className="date ago">{time}</span> }
				</div>
				<div className="details">
					{author && <>({author})</> }
					{comment && <>{comment}</> }
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
		return getT()
	}
	const getPlayer = ({ title, band, href, audio, mp3, author, comment, date, time }) => (
		<>
			{getTitle(props)}
			<audio controls="controls" title={title} preload="none" className="audio">
				<source src={`/audio/${audio || mp3}`} type="audio/mpeg" />
			</audio>
			{/*
			<a className="audio" href={`/audio/${audio || mp3}`}><img src={`/images/lilspeaker.gif`} width="11" height="11" alt="play audio" hspace="5" /></a>
			{getTitle(props)}
			<div className="details">
				{time && <>({time})</> }
				{author && <>({author})</> }
				{comment && <>- {comment}</> }
				{date && <>({date})</> }
			</div>
			*/}
		</>
	)

	return(
		<div className="player">
			{getPlayer(props)}
		</div>
	);
};

const typeToDisplay = (type) => {
	const	types = [
		[ 'interview', 'Interview' ],
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

		const ago = ((Difference_In_Years > 1) ? `${Math.floor(Difference_In_Years)} yrs` : `${Math.ceil(Difference_In_Days)} days`) + ` ago`;
		return <span className="date">{ret}<span className="date ago">{ago}</span></span>
		} catch {
			return date;
		}
	}
}

const Item = ({ bold, info, date, body, extra }, key) => (
	<li className="row" key={key}>
		{bold && <div>
			<b>{bold}</b>
		</div>}
		{info && <div>
			{info}
		</div>}
		{date && <div>
			{makeDate(date)}
		</div>}
		{extra && <div>
			{extra}
		</div>}
		{body && <><hr/>
		<blockquote>
			{body}
		</blockquote></>}
	</li>
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

const dateCompare = (a, b) => {
	return new Date(a.published || '1900-01-01') - new Date(b.published || '1900-01-01');
}

module.exports = { Topper, SectionHeader, makeReleaseLink, AudioPlayer, typeToDisplay, makeSubject, FormatDate, makeDate, Item, makeAuthor, dateCompare };
