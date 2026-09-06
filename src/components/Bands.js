import MyLink from '@/components/MyLink';
import { getBandNames, makeBandLink } from '@/lib/helpers';
import Item from '@/components/Item';
import SectionHeader from '@/components/SectionHeader';

const MakeBandBlurb = (item, key) => {
	return (<Item key={key} extra={(
		<div className="artist">
			<MyLink href={makeBandLink(item)}>{item}</MyLink>
		</div>
	)} />)
}

const Bands = () => {
	const bands = getBandNames();
	return (
		<>
		<SectionHeader text={`${bands?.length} (documented) bands recorded w/us`} />
		<Item
			extra={
				<div className="panelContainer">
					{bands.map(MakeBandBlurb)}
				</div>
			} />
		</>
	);
}

export default Bands;
