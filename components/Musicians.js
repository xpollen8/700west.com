import Link from 'next/link';
import { getMusicianNames, makeMusicianLink } from '../lib/helpers';
import Item from './Item';
import AKAs from '../lib/AKAs';

const makeAKA = (name) => {
	const akas = AKAs[name];
	if (!akas) return null;
	return <div>(<b>AKA</b>: "{akas?.filter(a => a !== name).join('", "')}")</div>;
}

const makeMusicianBlurb = (item, key) => (
	<div className="row" key={key}>
		<div className="artist">
			<Link href={`${makeMusicianLink(item)}`}>{item}</Link>
		</div>
		{makeAKA(item)}
	</div>
);

const Musicians = () => {
	const musicians = getMusicianNames();
	return (
		 <Item bold={`Approximately ${musicians?.length} musicians passed through our doors`}
				 extra={<div className="panelContainer">{musicians?.map(makeMusicianBlurb)}</div>}
			/>
	);
}

export default Musicians;
