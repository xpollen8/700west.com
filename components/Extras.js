import releases from '../lib/releases';
import { makeReleaseLink, typeToDisplay, makeSubject } from '../lib/helpers';

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
					<li className="addendum subject row" key={key2}>
						{typeToDisplay(type)}: <a href={`${data.releaseLink}?addendum=${key2 + 1}`}>{makeSubject({ title, location, source, date, type, href: data.releaseLink, number: key2 })}</a>
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
