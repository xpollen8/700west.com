import releases from '../lib/releases';
import { dateCompare, makeReleaseLink, Item } from '../lib/helpers';

const AKAs = {
	'M. J. Whittemore, Jr.': [ 'Mo', 'Moe', 'Mo Whittemore', 'Mo Wittemore*', 'Moe Whittemore', 'M. J. Whittemore, Jr.', 'M. Whittemore Jr' ],
	'Jay Wilfong': [ 'Jay Wilfong', 'William Bonney' ],
	'Arthur Swords': [ 'Shanty' ],
	'Dan Gustin': [ 'Danny Gustin' ],
};

const makeAKA = (name) => {
	const akas = AKAs[name];
	if (!akas) return null;
	return <div>(<b>AKA</b>: "{akas?.filter(a => a !== name).join('", "')}")</div>;
}

const makeMusicianBlurb = (item, key) => (
	<div className="row" key={key}>
		<div className="artist">{item}</div> {makeAKA(item)} {releasesByMusician(item)?.map((r, i) =>
			(<li key={i}><b>{r?.artist}</b> - <a href={`${makeReleaseLink(r?.artist, r?.title)}${(r?.type === 'single') ? '-7' : ''}`}><nobr>{r?.title}</nobr></a> {r?.type === 'single' ? '(single)' : ''}</li>)
		)}
	</div>
);

const isAKA = (name) => {
	const hasAKA = Object.keys(AKAs).find(a => {
		if (a === name) return name;
		return AKAs[a]?.find(aka => aka.toLowerCase() === name.toLowerCase())
	}) || name;
	return hasAKA;
}

const releasesByMusician = (mus) => {
	const uniqueReleases = [].concat(...releases.map(r => {
		const releases = r?.credits?.filter(c => isAKA(c.who) === mus)?.map(c =>
			({
				artist: (r.type !== 'single') ? r.artist : `${r.artist || r.tracks[0]?.artist}`,
				title: (r.type !== 'single') ? r.title : `${r.title || r.tracks[0]?.title}`,
				type: r.type
			})
		) || [];
		const tracks = r?.tracks.map(t => t?.credits?.filter(c => isAKA(c.who) === mus)?.map(c =>
			({
				artist: (r.type !== 'single') ? r.artist : r.tracks[0]?.artist,
				title: (r.type !== 'single') ? r.title : r.tracks[0]?.title,
				type: r.type
			})
		)) || [];

		return releases.concat(...tracks);
	}));
	const ret = [];
	uniqueReleases.filter(f => f).forEach(({ artist, title, type }) => {
		if (!ret.find(u => u.artist === artist && u.title == title && u.type === type)) {
			ret.push({ artist, title, type });
		}
	});
	return ret.sort((a, b) => ('' + a.artist).localeCompare(b.artist))
}

const	getMusicianNames = () => {
	const uniqueNames = [].concat(...releases.map(r => {
		const credits = r?.credits?.map(c => c.who) || [];
		const tracksCredits = r?.tracks.map(t => t?.credits?.map(c => c.who)) || [];
		return credits.concat(...tracksCredits).filter(f => f);
	}));
	return uniqueNames.map(n => isAKA(n)).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const Musicians = () => {
	const musicians = getMusicianNames();
	return (
		<>
			<b>Approximately {musicians?.length} musicians passed through our doors:</b>
			<blockquote className="panelContainer">
				{musicians?.map(makeMusicianBlurb)}
			</blockquote>
		</>
	);
}

export default Musicians;
