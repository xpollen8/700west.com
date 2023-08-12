import Link from 'next/link';
import { getBandNames, makeBandLink } from '../lib/helpers';
import Item from './Item';
import SectionHeader from './SectionHeader';

const MakeBandBlurb = (item, key) => {
	return (<Item key={key} extra={(
		<div className="artist">
			<Link href={makeBandLink(item)}>{item}</Link>
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
