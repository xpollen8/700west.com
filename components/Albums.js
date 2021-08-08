import Image from 'next/image';
import releases from '../lib/releases';
import { SectionHeader, makeReleaseLink } from '../lib/helpers';

const makeAlbumBlurb = (item, key) => (
	<a className="album cover" key={key} href={makeReleaseLink(item.artist, item.title)}><Image
		src={`/images/covers/${item.image[0].thumb}`}
		alt={`${item.artist} - ${item.image[0].name}`}
		width={125}
		height={125} /></a>
)

const Albums = () => (
	<>
	<blockquote>
		Between 1972 and 1983, several singles and albums were recorded by Moe Whittemore
		at the 700 West Recording studio.  A select few were released on the 700 West label.
		Others were released on other labels.
		Today, these are highly-collectible records!
	</blockquote>
	<blockquote>
		We're currently working to digitize the original 1/4" master and 1/2" source tapes.
	</blockquote>
	<b>Released on the 700 West label</b>
		<div className="row" style={{ textAlign: 'center', margin: '15px' }}>
			{releases.filter(r => r.type === 'album' && r.label.match(/700/)).sort((a, b) => new Date(a.published) - new Date(b.published)).map(makeAlbumBlurb)}
		</div>
	<b>Recorded at 700 West, released on other labels</b>
		<div className="row" style={{ textAlign: 'center', margin: '15px' }}>
			{releases.filter(r => r.type === 'album' && !r.label.match(/700/)).sort((a, b) => new Date(a.published) - new Date(b.published)).map(makeAlbumBlurb)}
		</div>
	</>
)

export default Albums;
