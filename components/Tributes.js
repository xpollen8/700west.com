import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';

const makeTribute = (item, key) => (
	<div key={key}>
		<SectionHeader text={[item.author, item.source, item.title, item.date].join(' - ').replace(/- -/g, '-')} />
		{item.body}
	</div>
)

const Tributes = () => {
	const ret = [];
	releases.forEach(r => {
		r.addendum.forEach(a => {
			if (a.type === 'reminiscence') {
				ret.push(a);
			}
		});
	});
	console.log("RET", ret);
	return (
		<div className="tributes">
			{ret.map(makeTribute)}
		</div>
	)
}

export default Tributes;
