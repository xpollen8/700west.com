import Link from 'next/link';
import { makeBandLink, Item } from '../lib/helpers';
import { getBandNames } from './Muso';

const makeBandBlurb = (item, key) => {
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
					{bands.map(makeBandBlurb)}
				</div>
			} />
	);
}

export default Bands;
