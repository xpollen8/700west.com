import Link from 'next/link';
import releases from '../lib/releases';
import { dateCompare, makeBandLink, Item } from '../lib/helpers';
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
		<>
			<b>Approximately {bands?.length} bands passed through our doors:</b>
			<blockquote className="panelContainer">
			{bands.map(makeBandBlurb)}
			</blockquote>
		</>
	);
}

export default Bands;
