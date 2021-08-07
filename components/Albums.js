import Image from 'next/image';
import releases from '../lib/releases';
import { SectionHeader, makeReleaseLink } from '../lib/helpers';

const makeAlbumBlurb = (item, key) => {
	const href = makeReleaseLink(item.artist, item.title);

	return <a className="album cover" key={key} href={href}><Image
		border="1" src={`/images/covers/${item.image[0].thumb}`}
		border={0}
		alt={`${item.artist} - ${item.image[0].name}`}
		width={150}
		height={150} /></a>
}

const Albums = () => (
	<>
	<blockquote>
		Between 1972 and 1983, several singles and albums were released on the 700 West label.
		Many other releases were recorded at the studio and released on other labels.
		Today, these highly-collectible records sell for hundreds of dollars!
	</blockquote>
	<blockquote>
		We're currently working on digitizing and re-releasing some 700 West material.
	</blockquote>
	<b>Released on the 700 West label</b>
		<div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
		{releases.filter(r => r.type === 'album' && r.label.match(/700/)).map(makeAlbumBlurb)}
		</div>
	<b>Recorded at 700 West, released on other labels</b>
		<div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
		{releases.filter(r => r.type === 'album' && !r.label.match(/700/)).map(makeAlbumBlurb)}
		</div>
	</>
)

export default Albums;
