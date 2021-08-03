import News from '../components/News';
import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';

const cleanName = (value) => value.replace(/['"?,/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_");

const makeReleaseLink = (artist, title) => `${cleanName(artist)}-${cleanName(title)}`;

const makeSingleBlurb = (item, key) => {
	const href = makeReleaseLink(item.tracks[0].artist, item.tracks[0].title);
	const artistA = item.tracks[0].artist;
	const artistB = item.tracks[1].artist;
	return <li className="single">
		{item.image && item.image[0] && item.image[0].thumb &&
			<img className="single cover"
				src={`http://700west.com/images/covers/${item.image[0].thumb}`} alt="cover"
				width={item.image[0].width}
				height={item.image[0].height}
			/>
		}
		<a className="single artist" href={`/releases/${href}`}>{artistA}</a>
		<div className="single sideA">{item.tracks[0].title}</div>
		{(artistA !== artistB) &&
			<div className="single artist">{artistB}</div>
		}
		<div className="single sideB">{item.tracks[1].title}</div>
	</li>
}

const Singles = () => (
	<>
	<SectionHeader text="Click for more information" />
	<ul className="singles">
		{releases.filter(r => r.type === 'single').map(makeSingleBlurb)}
	</ul>
	</>
)

export default Singles;
