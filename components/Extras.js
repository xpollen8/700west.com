import releases from '../lib/releases';
import { Item, makeReleaseLink, typeToDisplay, makeSubject } from '../lib/helpers';

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
		{Object.keys(types).map((type, key) => (
			<div key={key}>
				<b>{`${typeToDisplay(type)}s`}</b>
				<blockquote className="panelContainer">
				{types[type].map(({ item, addendum, number }, key) => {
					const href = makeReleaseLink(item.artist || item.tracks[0].artist, item.title || item.tracks[0].title);
					return (
						<Item
							key={key}
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
			</div>
		))}
	</>
}

export default Extras;
