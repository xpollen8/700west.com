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

const	makeSubject = ({ title, location, source, date, type, href, number }) => {
	
	const display = title || [source, location].filter(x => x).join(' - ');
	return display;
		//<a href={`${href}?addendum=${number + 1}`}>{display}</a>
		{/* BOMBS IN PRODUCTION date && displayDate(date) */}
}

module.exports = { makeReleaseLink, AudioPlayer, typeToDisplay, makeSubject };
