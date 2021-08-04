import News from '../components/News';
import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';
import { makeReleaseLink } from '../lib/helpers';

const makeSingleBlurb = (item, key) => {
	const href = makeReleaseLink(item.tracks[0].artist, item.tracks[0].title);
	const artistA = item.tracks[0].artist;
	const artistB = item.tracks[1].artist;
	return <li className="single">
		<div className="single cover">
			{item.image && item.image[0] && item.image[0].thumb &&
					<img src={`/images/covers/${item.image[0].thumb}`} alt="cover"
					width={60}
					height={60}
				/>
			}
		</div>
		<div className="single details">
			<a className="single artist" href={`/releases/${href}`}>{artistA}</a><span className="date ago">{item.published}</span>
			<div className="single sideA">A: "{item.tracks[0].title}"</div>
			{(artistA !== artistB) &&
				<div className="single artist">{artistB}</div>
			}
			<div className="single sideB">B: "{item.tracks[1].title}"</div>
		</div>
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
