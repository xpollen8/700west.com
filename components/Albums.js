import News from '../components/News';
import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';
import { makeReleaseLink } from '../lib/helpers';

const makeAlbumBlurb = (item, key) => {
	const href = makeReleaseLink(item.artist, item.title);

	return <a className="album cover" key={key} href={`/releases/${href}`}><img
		border="1" src={`/images/covers/${item.image[0].thumb}`}
		border={0}
		alt={`${item.artist} - ${item.image[0].name}`}
		width={150}
		height={150} /></a>
}

const Albums = () => (
	<>
	<News slug="bandcampRelease" />
	<SectionHeader text="Short History" />
	<p>
		Between 1972 and 1983, several singles and albums were released on the 700 West label.
	</p>
	<p>
		Many releases were recorded at the studio and released on other labels.
	</p>
	<p>
		Today, many of these records sell amongst collectors for hundreds of dollars!
	</p>
	<p>
		We're currently working on tizing and re-releasing some 700 West material.
	</p>
	<p>
		Get in <a href="/contact">touch with us</a> if you have specific requests.
	</p>
	<SectionHeader text="Click for more information" />
	<ul className="albums">
		{releases.filter(r => r.type === 'album').map(makeAlbumBlurb)}
	</ul>
	</>
)

export default Albums;
