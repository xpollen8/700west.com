import { getBodyHTML } from '../lib/helpers';
import MakeDate from './MakeDate';
import Lyrics from './Lyrics';
import AudioPlayer from './AudioPlayer';

const Item = ({ children, bold, author, info, date, body, extra, lyrics, audio }, key) => (
	<div className="row" key={key}>
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
	</div>
)

export default Item;
