import releases from '../lib/releases';
import { Item, SectionHeader, makeReleaseLink, typeToDisplay, makeSubject } from '../lib/helpers';

const AddendumItem = (item, key) => {
	const data = {
		artist: item.artist || item.tracks[0].artist,
		title: item.title || item.tracks[0].title,
	};
	data.releaseLink = makeReleaseLink(data.artist, data.title);

	return <p className="row" key={key} style={{ borderRadius: '20px', padding: '10px' }}>
		<span className="addendum artist">
			{data.artist}
		</span>
		<span className="addendum title">
			<a href={data.releaseLink }>{data.title}</a>
		</span>
		<span className="date ago">
			{item.published}
		</span>
		<>
			{item.addendum.map(({ location, original, source, credit, date, type, author, authorContact, title, body }, key2) => (
					<p className="row" key={key2}>
						<span className="datum">{typeToDisplay(type)}</span> : <a href={`${data.releaseLink}?addendum=${key2 + 1}`}>{makeSubject({ title, location, source, date, type, href: data.releaseLink, number: key2 })}</a>
					</p>
				)
			)}
		</>
	</p>
}

const Extras = (props) => {
	const types = {};
	const add = releases.filter(r => r.addendum && r.addendum.length);
	add.forEach(a => {
		const addType = (item, addendum) => {
			if (!types[item.type]) { types[item.type] = [] }
			types[item.type].push({ item: a, addendum: item, number: (addendum + 1) });
		}
		const review = a.addendum.forEach(addType);
	});
	return <>
		{Object.keys(types).map(type => (
			<>
				<b>{`${typeToDisplay(type)}s`}</b>
				<blockquote>
				{types[type].map(({ item, addendum, number }) => {
					const href = makeReleaseLink(item.artist || item.tracks[0].artist, item.title || item.tracks[0].title);
					return (
						<Item
							bold={<>
								{item.artist || item.tracks[0].artist} <span style={{ fontWeight: 'normal' }}> - <a href={href}>{item.title || item.tracks[0].title}</a></span>
							</>}
							info={<>
								{typeToDisplay(type)} : <a href={`${href}?addendum=${number}`}>{makeSubject(addendum)}</a>
							</>}
							date={addendum.date}
						/>
					)
				})}
				</blockquote>
			</>
		))}
	</>
}
	/*
	<>{releases.filter(r => r.addendum && r.addendum.length).map(a => {

		console.log("TYPE", a.addendum);
		return a.type === 'review'}).map(AddendumItem)}</>
)
*/

export default Extras;
