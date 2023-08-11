import releases from '../lib/releases';
import Item from './Item';
import MakeAuthor from './MakeAuthor';

const makeTribute = (item, key) => <Item key={key} bold={MakeAuthor(item.author, item.authorContact)} info={(item.source || item.title)} date={item.date} body={item.body} lyrics={item.lyrics} audio={item.audio} />

const Tributes = () => {
	const ret = [];
	releases.forEach(r => {
		if (r.type === 'reminiscence') {	// turn a release into a reminiscence (RDEO THIS TO NORMALIZE)
			const { lyrics, audio } = r.tracks[0];
			ret.push({
				date: r.published,
				title: r.title,
				author: r.artist,
				lyrics,
				audio,
			});
		}
		r?.addendum?.forEach(a => {
			if (a.type === 'reminiscence') {
				ret.push(a);
			}
		});
	});
	return (
		<div className="tributes">
			{ret.map(makeTribute)}
		</div>
	)
}

export default Tributes;
