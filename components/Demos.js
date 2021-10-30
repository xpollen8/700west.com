import Image from 'next/image';
import releases from '../lib/releases';
import { Item, dateCompare, SectionHeader, makeReleaseLink } from '../lib/helpers';

const makeDemoBlurb = (item, key) => {
	const thumb = item.image[0]?.thumb || item.publicity[0]?.image || `missingCover.jpg`;
	const directory = item.image[0]?.thumb ? 'covers' : (item.publicity[0]?.image ? 'publicity' : 'covers');

	return <Item key={key}
		extra={<>
			<a className="album cover" key={key} href={makeReleaseLink(item.artist, item.title)}><Image
				src={`/images/${directory}/${thumb}`}
				alt={`${item.artist} - ${item.title}`}
				width={125}
				height={125} /></a>
			<p>
			<a className="single artist" href={makeReleaseLink(item.artist, item.title)}>{item.artist} - {item.title}</a><span className="date ago">{item.published}</span>
			</p>
		</>}
	/>
}

const Demos = () => (
	<>
		<p>
			700 West Recording was a place that catered to the musician.  Plenty of area studios
			back in '72 were doing the commercial thing.  That's where the money was.  But there was
			a big vacuum in affordable locations for bands to cut a quality demo.  This was to be our
			niche.
		</p>
		<p>
			Moe - 2001-02-03
		</p>
		<hr/>
		<p>
			<b>Demos recorded at 700 West Recording</b>
		</p>
		<div className="" style={{ margin: '15px' }}>
			{releases.filter(r => r.type === 'demo').sort(dateCompare).map(makeDemoBlurb)}
		</div>
	</>
)

export default Demos;
