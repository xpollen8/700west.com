import Link from 'next/link';
import { getBandNames, makeBandLink } from '../lib/helpers';
import Item from './Item';

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
		<Item bold={`Approximately ${bands?.length} bands passed through our doors`}
			extra={
				<div className="panelContainer">
					{bands.map(MakeBandBlurb)}
				</div>
			} />
	);
}

export default Bands;
