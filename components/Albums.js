import Image from 'next/image';
import releases from '../lib/releases';
import { Item, dateCompare, SectionHeader, makeReleaseLink } from '../lib/helpers';
import News from './News';

const makeAlbumBlurb = (item, key) => {
	const thumb = item.image[0]?.thumb || `missingCover.jpg`;

	return <a className="album cover" key={key} href={makeReleaseLink(item.artist, item.title)}><Image
		src={`/images/covers/${thumb}`}
		alt={`${item.artist} - ${item.title} cover`}
		width={125}
		height={125} /></a>
}

const Albums = () => (
	<>
	<div className="panelContainer">
	<p>
		Between 1972 and 1983, about 35 singles and 37 albums were recorded by Mo Whittemore
		at the 700 West Recording studio.  A select few were released on the 700 West label.
		Others were released on other labels.
		Today, these are highly-collectible records!
	</p>
	<p>
		We're currently working to digitize the original 1/4" master and 1/2" source tapes that
		remain in the 700 West archives.
	</p>
	</div>
	<News slug='bandcampRelease' />
	<Item
		bold={`Albums released on the 700 West label`}
		body={
			releases.filter(r => r.type === 'album' && r.label.match(/700/)).sort(dateCompare).map(makeAlbumBlurb)
		}
	/>
	<Item
		bold={`Albums recorded at 700 West, released on other labels`}
		body={
			releases.filter(r => r.type === 'album' && !r.label.match(/700/)).sort(dateCompare).map(makeAlbumBlurb)
		}
	/>
	</>
)

export default Albums;
