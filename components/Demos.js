import Image from 'next/image';
import releases from '../lib/releases';
import { Item, dateCompare, SectionHeader, makeReleaseLink } from '../lib/helpers';

const makeDemoBlurb = (item, key) => {
	const thumb = (item?.image && item?.image[0]?.thumb) || (item?.publicity && item?.publicity[0]?.image);
	const directory = (item?.image && item?.image[0]?.thumb) ? 'covers' : ((item?.publicity && item?.publicity[0]?.image) ? 'publicity' : 'covers');

	return <Item key={key}
		extra={<>
			<a className="album cover" key={key} href={makeReleaseLink(item.artist, item.title)}><Image
				src={thumb ? `/images/${directory}/${thumb}_thumb.jpg` : `/images/${directory}/missingCover.jpg`}
				alt={`${item.artist} - ${item.title}`}
				width={125}
				height={125} /></a>
			<p>
			<a className="single artist" href={makeReleaseLink(item.artist, item.title)}>{item.artist} - {item.title}</a> {item.published && <span className="date ago">{item.published}</span>}
			</p>
		</>}
	/>
}

const Demos = () => (
	<>
		<p>
		While many demo recordings have been lost to time, some of the remaining
		master tapes were digitized around ~1994.
		The best of those are available on the two volumes of the <b>Best of 700 West</b>.
		</p>
		<p>
		Efforts are underway to digitize the remaining 1/4" 15IPS masters. Who knows? There may be
		additional Best of Volumes!
		</p>
		<p>
			<div style={{padding: "10px", width: '95%' }}>
				<iframe title="Store" style={{ border: 0, width: '100%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1474513005/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
				<iframe title="Store" style={{ border: 0, width: '100%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=762103402/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
			</div>
		</p>
		<blockquote>
			<i>
			700 West Recording was a place that catered to the musician.  Plenty of area studios
			back in '72 were doing the commercial thing.  That's where the money was.  But there was
			a big vacuum in affordable locations for bands to cut a quality demo.  This was to be our
			niche.
			</i>
		<p>
			<b>Mo - 2001-02-03</b>
		</p>
		</blockquote>
		<hr/>
		<p>
			<b>Demos sessions</b>
		</p>
		<div className="" style={{ margin: '15px' }}>
			{releases.filter(r => r.type === 'demo').sort(dateCompare).map(makeDemoBlurb)}
		</div>
	</>
)

export default Demos;
