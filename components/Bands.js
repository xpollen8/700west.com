import releases from '../lib/releases';
import { dateCompare, makeReleaseLink, Item } from '../lib/helpers';

const makeBandBlurb = (item, key) => {
	return (<Item key={key} extra={(<div className="artist">{item}</div>)} />)
}

const	getBandNames = () => {
	const X = [].concat(...releases.map(r => {
		const trackArtists = r?.tracks?.map(t => t.artist);
		return [ r?.artist ].concat(trackArtists);
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
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
