import Link from 'next/link';
import { Item, makeReleaseLink, makeBandLink } from '../lib/helpers';
import { getMusicianNames, releasesByMusician, AKAs, makeMusicianLink } from './Muso';

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
		{/*releasesByMusician(item)?.map((r, i) => (
			<li key={i}>
				{(r.compilation !== true) ?
					<Link href={makeBandLink(r?.artist)}>{r.artist}</Link>
					:
					<b>{r?.artist}</b>
				}
			- <a href={`${makeReleaseLink(r?.artist, r?.title)}${(r?.type === 'single') ? '-7' : ''}`}><nobr>{r?.title}</nobr></a> {r?.type === 'single' ? '(single)' : ''}
			</li>
			)
		)*/}
	</div>
);

const Musicians = () => {
	const musicians = getMusicianNames();
	return (
		 <Item bold={`Approximately ${musicians?.length} musicians passed through our doors`}
				 body={<div className="panelContainer">{musicians?.map(makeMusicianBlurb)}</div>}
			/>
	);
}

export default Musicians;
