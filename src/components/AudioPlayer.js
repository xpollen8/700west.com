import { getBodyHTML } from '../lib/helpers';

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

export default AudioPlayer;
