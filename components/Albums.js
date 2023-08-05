import Image from 'next/image';
import { getAlbumNames, dateCompare, makeReleaseLink } from '../lib/helpers';
import Item from './Item';

const makeAlbumBlurb = (item, key) => {
	const thumb = item.image[0]?.thumb || `missingCover.jpg`;

	return <a className="album cover" key={key} href={makeReleaseLink(item.artist, item.title)}><Image
		className="avatar"
		src={`/images/covers/${thumb}`}
		alt={`${item.artist} - ${item.title} cover`}
		width={200}
		height={200} /></a>
}

const Albums = () => {
	const albums = getAlbumNames();
	return (
		<>
		<div className="panelContainer">
			<p className="row">
				Between 1972 and 1983, about 35 singles and 37 albums were recorded by Mo Whittemore
				at the 700 West Recording studio.  A select few were released on the 700 West label.
				Others were released on other labels.
				Today, these are highly-collectible records!
			</p>
			<p className="row">
				We're currently working to digitize the original 1/4" master and 1/2" source tapes that
				remain in the 700 West archives.
			</p>
		</div>
		<div className="row">
			<div className="center">
				<iframe title="Store" style={{ border: 0, width: '80%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/album=1474513005/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true" seamless />
				<iframe title="Store" style={{ border: 0, width: '80%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=762103402/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
			</div>
		</div>
		<Item
			bold={`Albums released on the 700 West label`}
			extra={
				albums.filter(r => r.label.match(/700/)).sort(dateCompare).map(makeAlbumBlurb)
			}
		/>
		<Item
			bold={`Albums recorded at 700 West, released on other labels`}
			extra={
				albums.filter(r => !r.label.match(/700/)).sort(dateCompare).map(makeAlbumBlurb)
			}
		/>
		</>
	)
}

export default Albums;
