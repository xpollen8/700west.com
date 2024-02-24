import releases from '../lib/releases';
import { dateCompare, makeReleaseLink } from '../lib/helpers';
import Item from './Item';
import SectionHeader from './SectionHeader';

const makeSingleBlurb = (item, key) => {
	const artistA = item?.artist || item.tracks[0].artist;
	const artistB = item?.artist || item.tracks[1].artist;
	const alsoAlbum = releases.find(r => r.type === 'album' && r.artist === item.tracks[0].artist && r.title === item.tracks[0].title);
	// if there are both an album and single by the same artist/title,
	// then apend '-7' onto the URL for the single
	const href = makeReleaseLink(artistA, item.tracks[0].title) + `${alsoAlbum ? '-7' : ''}`;
	return <Item key={key}
		extra={<>
			<a className="single artist" href={href}>{artistA}</a> {item.published && <span className="date ago">{item.published}</span>}
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
		<SectionHeader text="Singles released on the 700 West label" />
 		<Item
 			extra={
 			<div className="panelContainer">
 			{releases.filter(r => r.type === 'single' &&
 				r.label.match(/700/)).sort(dateCompare).map(makeSingleBlurb)}
 			</div>
 		}/>
		<SectionHeader text="Singles recorded at 700 West, released on other labels" />
 		<Item
 			extra={
 			<div className="panelContainer">
 			{releases.filter(r => r.type === 'single' &&
 				!r.label.match(/700/)).sort(dateCompare).map(makeSingleBlurb)}
 			</div>
 		}/>
	</>
)

export default Singles;
