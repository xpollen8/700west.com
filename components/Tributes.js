import releases from '../lib/releases';
import { Item, makeAuthor } from '../lib/helpers';

const makeTribute = (item, key) => <Item key={key} bold={makeAuthor(item.author, item.authorContact)} info={(item.source || item.title)} date={item.date} body={item.body} lyrics={item.lyrics} audio={item.audio} />

const Tributes = () => {
	const ret = [];
	releases.forEach(r => {
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
