import releases from '../lib/releases';
import { dateCompare, makeReleaseLink, Item } from '../lib/helpers';

const makeSingleBlurb = (item, key) => {
	const artistA = item.tracks[0].artist;
	const artistB = item.tracks[1].artist;
	const alsoAlbum = releases.find(r => r.type === 'album' && r.artist === item.tracks[0].artist && r.title === item.tracks[0].title);
	// if there are both an album and single by the same artist/title,
	// then apend '-7' onto the URL for the single
	const href = makeReleaseLink(item.tracks[0].artist, item.tracks[0].title) + `${alsoAlbum ? '-7' : ''}`;
	return <Item key={key}
		extra={<>
			<a className="single artist" href={href}>{artistA}</a><span className="date ago">{item.published}</span>
			<div className="single sideA">A: "{item.tracks[0].title}"</div>
			{(artistA !== artistB) &&
				<div className="single artist">{artistB}</div>
			}
			<div className="single sideB">B: "{item.tracks[1].title}"</div>
		</>}
	/>
}

const Singles = () => (
	<>
		<b>Released on the 700 West label</b>
		<blockquote className="panelContainer">
		{releases.filter(r => r.type === 'single' &&
			r.label.match(/700/)).sort(dateCompare).map(makeSingleBlurb)}
		</blockquote>
		<b>Recorded at 700 West, released on other labels</b>
		<blockquote className="panelContainer">
		{releases.filter(r => r.type === 'single' &&
			!r.label.match(/700/)).sort(dateCompare).map(makeSingleBlurb)}
		</blockquote>
	</>
)

export default Singles;
