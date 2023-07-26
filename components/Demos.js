import Image from 'next/image';
import releases from '../lib/releases';
import { Item, dateCompare, SectionHeader, makeReleaseLink } from '../lib/helpers';

const makeDemoBlurb = (item, key) => {
	const thumb = (item?.image && item?.image[0]?.thumb) || (item?.publicity && item?.publicity[0]?.image);
	const reels = item?.reels && item?.reels[0];
	const directory = (item?.image && item?.image[0]?.thumb) ? 'covers' : ((item?.publicity && item?.publicity[0]?.image) ? 'publicity' : 'covers');

	return <Item key={key}
		extra={<div className="flexor">
			<div>
			<a className="album cover" key={key} href={makeReleaseLink(item.artist, item.title)}><Image
				className="avatar"
				src={thumb ? `/images/${directory}/${thumb}_thumb.jpg` : (
					reels ? `https://tapes.700west.com/api/reels/${reels}` : `/images/${directory}/missingCover.jpg`)}
				alt={`${item.artist} - ${item.title}`}
				width={125}
				height={125} /></a>
			</div>
			<div>
				<p>
					<a className="single artist" href={makeReleaseLink(item.artist, item.title)}>{item.artist}</a>
				</p>
				<p>
					<a className="single artist" href={makeReleaseLink(item.artist, item.title)}>{item.title}</a> {item.published && <span className="date ago">{item.published}</span>}
				</p>
			</div>
		</div>}
	/>
}

const Demos = () => (
	<>
		<div className="panelContainer">
		<p className="row">
		While many demo recordings have been lost to time, some of the remaining
		master tapes were digitized around ~1994.
		The best of those are available on the two volumes of the <b>Best of 700 West</b>.
		</p>
		<p className="row">
		Efforts are underway to digitize the remaining 1/4" 15IPS masters. Who knows? There may be
		additional Best of Volumes!
		</p>
		</div>
		<div className="row">
			<div className="center">
				<iframe title="Store" style={{ border: 0, width: '80%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/album=1474513005/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true" seamless />
				<iframe title="Store" style={{ border: 0, width: '80%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=762103402/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
			</div>
		</div>
		<blockquote className="row">
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
		<Item bold={`Demo Sessions`}
			body={
				<div className="panelContainer">
					{releases.filter(r => r.type === 'demo').sort(dateCompare).map(makeDemoBlurb)}
				</div>
			} />
	</>
)

export default Demos;
