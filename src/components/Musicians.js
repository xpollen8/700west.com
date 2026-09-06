import MyLink from '@/components/MyLink';
import { getMusicianNames, makeMusicianLink, makeMusicianCreditCount, bandsByMusician } from '@/lib/helpers';
import Item from '@/components/Item';
import AKAs from '@/lib/AKAs';
import SectionHeader from '@/components/SectionHeader';

const makeAKA = (name) => {
	const akas = AKAs[name];
	if (!akas) return null;
	return <div>(<b>AKA</b>: "{akas?.filter(a => a !== name).join('", "')}")</div>;
}

const makeMusicianBlurb = (item, key) => {
	const creditCount = makeMusicianCreditCount(item);
	const bands = bandsByMusician(item);
	return (
		<div className="row" key={key}>
			<div className="artist">
				<MyLink href={`${makeMusicianLink(item)}`}>{item}</MyLink>
				{(creditCount > 0) && ` (credits on: ${creditCount})`}
			</div>
			{makeAKA(item)}
			{JSON.stringify(bands)}
		</div>
	)
}

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
