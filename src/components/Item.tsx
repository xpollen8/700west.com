import { getBodyHTML } from '../lib/helpers';
import MakeDate from './MakeDate';
import Lyrics from './Lyrics';
import AudioPlayer from './AudioPlayer';

//<Item bold={title || 'News Item!'} author={author} date={date} audio={audio} body={body} extra={extra}>

type Props ={
	children?: React.ReactNode
	bold?: string
	author?: string
	info?: string
	date?: string
	body?: string
	extra?: string | React.ReactElement
	lyrics?: string
	audio?: string
}

const Item = ({ children, bold, author, info, date, body, extra, lyrics, audio }: Props) => (
	<div className="row">
		{bold && <div className="artist">
			<b>{bold}</b>
		</div>}
		{info && <div>
			{info}
		</div>}
		{author && date && <div>
			{author} - {MakeDate(date)}
		</div>}
		{date && !author && <div>
			{MakeDate(date)}
		</div>}
		{extra && <>
			{extra}
		</>}
		{audio && <AudioPlayer mp3={audio} date={date}/>}
		{body && <blockquote>
			<div dangerouslySetInnerHTML={{ __html: getBodyHTML(body) }}></div>
		</blockquote>}
		<Lyrics lyrics={lyrics} />
		{children}
	</div>
)

export default Item;
