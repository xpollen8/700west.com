const cleanName = (value) => value.replace(/["?'/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_");

const makeReleaseLink = (artist, title) => `/releases/${cleanName(artist)}-${cleanName(title)}`;

const AudioPlayer = (props) => {
	const getTitle = ({ title, band, href, audio, mp3, author, comment, date, time }) => {
		const getT = (band, title) => (
			<div className="title">
				{band && <b>{band} - </b>}
				{title && <i>{title}</i>}
			</div>
		)
		if (mp3 && href) {
			return getT(band, title)
		} else if (mp3 && title) {
			return getT(band, title)
		} else if (audio && href) {
			return <a href={href}>{getT(band, title)}</a>
		} else if (audio && title) {
			return getT(band, title)
		} else if (href) {
			return getT(band, title)
		} else {
			return getT(band, title)
		}
	}
	const getPlayer = ({ title, band, href, audio, mp3, author, comment, date, time }) => (
		<>
			{/*
			<audio controls="controls" title={title} preload="none" className="audio">
				<source src={`${process.env.NEXT_PUBLIC_AUDIO}/${audio || mp3}`} type="audio/mpeg" />
			</audio>
			*/}
			<a className="audio" href={`${process.env.NEXT_PUBLIC_AUDIO}/${audio || mp3}`}><img src={`${process.env.NEXT_PUBLIC_IMAGES}/lilspeaker.gif`} width="11" height="11" alt="play audio" hspace="5" /></a>
			{getTitle(props)}
			<div className="details">
				{time && <>({time})</> }
				{author && <>({author})</> }
				{comment && <>- {comment}</> }
				{date && <>({date})</> }
			</div>
		</>
	)

	return(
		<div className="player">
			{getPlayer(props)}
		</div>
	);
};

module.exports = { makeReleaseLink, AudioPlayer };
