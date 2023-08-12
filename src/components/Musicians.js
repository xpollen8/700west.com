import Link from 'next/link';
import { getMusicianNames, makeMusicianLink } from '../lib/helpers';
import Item from './Item';
import AKAs from '../lib/AKAs';
import SectionHeader from './SectionHeader';

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
		 <>
			 <SectionHeader text={`${musicians?.length} (documented) musicians recorded w/us`} />
			 <Item
				 extra={<div className="panelContainer">{musicians?.map(makeMusicianBlurb)}</div>}
			/>
		</>
	);
}

export default Musicians;
