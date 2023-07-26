import Link from 'next/link';
import Image from 'next/image';
import { Page } from '../pages/_app';
import releases from '../lib/releases';
import { getBodyHTML, Lyrics, SectionHeader, makeReleaseLink, typeToDisplay, makeSubject, FormatDate, makeDate, makeAuthor, makeBandLink, makeSource } from '../lib/helpers';
import { AudioPlayer, makeMusicianLink } from './Muso';
import Albums from './Albums';
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'

const makeOriginal = (original) => {
	if (original) {
		return <span className="original">
			<Link href={original} target="new">{original}</Link>
		</span>
	}
}

const Addendum = ({ location, original, source, credit, date, type, author, authorContact, title, body, lyrics, artist, release, releaseLink, number }) => (
	<>
		<span className="artist">{artist}</span> : <Link href={releaseLink} className="title">{release}</Link>
		<div className="row">
			<Datum k="Source" v={source} />
			<Datum k="Location" v={location} />
			<Datum k="Type" v={typeToDisplay(type)} />
			<Datum k="Author" v={makeAuthor(author, authorContact)} />
			<Datum k="Published" v={makeDate(date)} />
			<Datum k="Original" v={makeOriginal(original)} />
		</div>
		{title &&
			<div className="title">{title}</div>
		}
		{body && <div className="row" dangerouslySetInnerHTML={{ __html: getBodyHTML(body) }}></div>}
		{lyrics && <Lyrics lyrics={lyrics} />}
	</>
)

const makeAddendum = (item, addendum = 0) => {
	const add = item.addendum && item.addendum.find((x, i) => i === addendum - 1);
	const link = (item.type === 'album') ? 'albums' : 'singles';
	const artist = item.artist || item.tracks[0].artist;
	const release = item.title || item.tracks[0].title;

	return <Page title="Addendum" link={link} description={makeSubject(add)} >
		{add && <Addendum {...add} artist={artist} release={release} releaseLink={makeReleaseLink(artist, release)} number={addendum} />}
	</Page>
}

const Covers = (release) => {
	return <div className="center">
		{release?.image?.map((i, key) => (
		<a key={key} href={`/images/covers/${i.file}`}><Image
			className="avatar"
			src={`/images/covers/${i.thumb}`}
			height="250"
			width="250"
			alt="image" /></a>
		))}
	</div>
}

const exists = (v) => v && v.length;

const smartLink = (v) => {
	if (typeof v === 'string' && v?.includes('http')) {
		return <Link href={v} target="new">{v}</Link>
	}
	return v;
}

const Datum = ({ k, v, className }) => {
	if (exists(v) || typeof v === 'object') {
		return <div>
			<span className="datum"> {k} </span>:
			<span className={className}> {smartLink(v)} </span>
		</div>
	}
	return <>{v}</>
}

const Who = ({ who = '' }) => {
	if (!who?.length) return <></>;
	return (
		<div className="who">
			<Link href={makeMusicianLink(who)}>{who}</Link>
		</div>
	);
}

const TrackCredits = ({ credits = [] }) => {
	if (credits.length) {
		return <>
			<div className="datum">Credits</div>
			<div className="row">
				{credits.map((c, key) => {
					return <p key={key}>
						<Who {...c} /> {c?.did && <p className="played">"{c?.did?.join('", "')}"</p>}
					</p>
				})}
			</div>
		</>
	}
	return <></>
}

const TrackComments = ({ comments = [] }) => {
	if (comments.length) {
		return <>
			<div className="datum">Comments</div>
				{comments.map((c, key) => {
					return <div key={key} className="row">
						<div dangerouslySetInnerHTML={{ __html: getBodyHTML(c.said) }}></div>
						<Who who={c.who} />
						{exists(c.date) && makeDate(c.date)}
					</div>
				})}
		</>
	}
	return <></>;
}

const Title = ({ artist, title = '', time }) => {
		return <>
		{artist && artist.length && <span className="artist"><Link href={makeBandLink(artist)}>{artist}</Link> - </span>}
		<span className="title">{title}</span>
		{time && <span className="date ago">{time}</span>}
	</>
}

const Published = ({ publisher = '', affiliation = '' }) => {
	if (publisher.length && affiliation.length) {
		return <Datum k="Publisher" v={`${publisher} (${affiliation})`}/>;
	} else if (publisher.length) {
		return <Datum k="Publisher" v={publisher} />;
	} else if (affiliation.length) {
		return <Datum k="Affiliation" v={affiliation} />;
	}
	return <></>;
}

const Track = (data, key) => (
	<p value={data.tracknum} key={key}>
		<Title {...data} />
		{(exists(data.audio) || exists(data.credits) || exists(data.comments) || exists(data.writer)) &&
		<div className="row">
		{exists(data.audio) && 
			<AudioPlayer mp3={data.audio} />
			}
		<div className="panelContainer">
			<TrackCredits credits={data.credits} />
			<TrackComments comments={data.comments} />
		</div>
		{(exists(data.mastering) || exists(data.writer) || exists(data.publisher) || exists(data.affiliation)) &&
			(exists(data.lyrics) || exists(data.credits) || exists(data.comments)) ?
			(<div className="row">
				<Datum k="Mastering" v={data.mastering} />
				<Datum k="Writer" v={data.writer} className='who' />
				<Published publisher={data.publisher} affiliation={data.affiliation} />
			</div>) :
			(<>
				<Datum k="Mastering" v={data.mastering} />
				<Datum k="Writer" v={data.writer} className='who' />
				<Published publisher={data.publisher} affiliation={data.affiliation} />
			</>)
		}
		<Lyrics {...data} />
		</div>}
	</p>
)

const TrackPanel = ({ side, tracks }) => {
	if (side) {
		return <div className="release panel">
			<SectionHeader text={`${side} Side`} />
			<div className={(tracks.filter(t => t.side === side).length > 1) ? "" : ""}>
				{tracks.filter(t => t.side === side).map(Track)}
			</div>
			</div>
	} else {
		return <>
			<SectionHeader text="Tracks" />
			<div className="panelContainer">
				{tracks.map(Track)}
			</div>
		</>
	}
}

const AudioTeaser = ({ tracks = [] }) => {
	const haveAudio = tracks.filter(t => (t.audio && t.audio.length));
	if (haveAudio.length) {
		return <div className="release teaser">{haveAudio.length} audio sample{haveAudio.length > 1 ? 's' : ''} available</div>
	} else {
		return <></>
	}
}

const HeaderData = (release) => {
	if (!(release.published || release.mastering || release.label || release.id || release.url || release.store)) return <></>;
	return (<>
		<div className="row">
			<Datum k="Published" v={release.published} />
			<Datum k="Mastering" v={release.mastering} />
			<Datum k="Label" v={release.label} />
			<Datum k="Serial" v={release.id} />
			<Datum k="Contact" v={release.url} />
			<Datum k="Purchase" v={release.store} />
		</div>
	</>)
}

const CommonHeader = (release) => {
	const artist = (release.type === 'single') ? release.tracks[0].artist : release.artist;
	const title = (release.type === 'single') ? release.tracks[0].title : release.title;
	const titles = (release.type === 'single') ?
		<>
				<div className="release artist">{artist}</div>
				<div className="release title">"{title}"</div>
				<div><i>b/w</i></div>
				{!!(artist !== release.tracks[1].artist) &&
					<div className="release artist">{release.tracks[1].artist}</div>
				}
				<div className="release title">"{release.tracks[1].title}"</div>
		</>
		:
		<>
				<div className="release artist">{artist}</div>
				<div className="release title">"{title}"</div>
		</>
	return (<>
		<div className="panelContainer">
			{!!(release.image?.length) && <div className="row panel">
				<Covers {...release } />
			</div>}
			<div className="row panel">
				{titles}
				<HeaderData {...release} />
				<AudioTeaser {...release} />
			</div>
		</div>
		<Promo {...release} />
		</>
	)
}

const Tracks = (item) => {
	const hasTracks = item?.tracks && item.tracks[0];
	const hasSides = item?.tracks && item.tracks[0]?.side?.length;
	if (hasSides) {
		return <div className="panelContainer">
			<TrackPanel side='A' tracks={item.tracks} key={1} />
			<TrackPanel side='B' tracks={item.tracks} key={2} />
		</div>
	} else if (hasTracks) {
		return <TrackPanel tracks={item.tracks} />
	}
	return <> </>
}

const Credits = ({ credits = [] }) => {
	if (credits.length) {
		return <>
			<SectionHeader text="Credits" />
			<p className="panelContainer">
			{credits.map(({ who, did }, key) => (
				<p key={key} className="row">
					<Who who={who} /> {did && <p className="played">"{did?.join('", "')}"</p>}
				</p>
			))}
			</p>
		</>
	}
	return <></>;
}

const LinerNotes = ({ liner = '' }) => {
	if (liner.length || typeof liner !== 'string') {
		return <>
			<SectionHeader text="Liner Notes" />
			<blockquote>
				<div className="row" dangerouslySetInnerHTML={{ __html: getBodyHTML(liner) }}></div>
			</blockquote>
		</>
	}
	return <></>;
}

const YellowSheets = ({ sheets = [] }) => {
	if (sheets.length) {
		return <>
			<SectionHeader text="Mo's 'yellow sheets' for this recording session" />
			<ul>
			{sheets.map(({ image, width, height, caption }, key) => (
				<li key={key}>
					<Link href={`/images/sessions/${image}.jpg`}><Image
						src={`/images/sessions/${image}_thumb.jpg`}
						alt="Mo's Session Sheets"
						width={width} height={height} /></Link>
					{(caption) && <i>{caption}</i>}
				</li>
			))}
			</ul>
		</>
	}
	return <></>;
}

const Reels = ({ reels = [] }) => {
	if (reels.length) {
		return <>
			<SectionHeader text="Tapes" />
			<ul>
			{reels.map((i, key) => (
				<li key={key}>
					<Link href={`https://tapes.700west.com/api/reels/${i}`}><Image
						src={`https://tapes.700west.com/api/reels/250/${i}`}
						caption="Da master tape"
						width={250} height={250} /></Link>
				</li>
			))}
			</ul>
		</>
	}
	return <></>;
}

const Promo = ({ publicity = [] }) => {
	if (publicity.length) {
		return <>
			<SectionHeader text="Promotional Material" />
			<ul>
			{publicity.map(({ image, width, height, caption }, key) => (
				<li key={key} className="row">
					<Link href={`/images/publicity/${image}.jpg`}><Image
						src={`/images/publicity/${image}_thumb.jpg`}
						alt="publicity shot"
						width={width} height={height} /></Link>
					{(caption) && <i>{caption}</i>}
				</li>
			))}
			</ul>
		</>
	}
	return <></>;
}

const Sales = ({ sales = [] }) => {
	if (sales.length) {
		const sorted = sales.sort((a, b) => new Date(a.date) - new Date(b.date));
		const original = { name: 'Original Released Price', data: {} };
		const reissue = { name: 'Re-Issued Release Price', data: {} };
		sorted.forEach(({ date, price = '', said }) => {
			const usePrice = price.replace(/[\$,]+/g, '');
			if (said?.match(/issue/i)) {
				reissue.data[date] = usePrice;
			} else {
				original.data[date] = usePrice;
			}
		})
		return <>
			<SectionHeader text="Sales History" />
			<div className="chart">
				<LineChart width={'100%'} data={[original]} prefix="$" round={2} zeros={true} />
			</div>
			{!!(Object.keys(reissue.data).length) &&
				<div className="chart"><LineChart width={'100%'} data={[reissue]} prefix="$" round={2} zeros={true} /></div>}
			<ul className="panelContainer">
			{sorted.map(({ date, said, price, where }, key) => (
				<p key={key} className="row">
						{exists(date) && <>
							{FormatDate(date)} {price && <span>- {price}</span>} {where && <span>- ({where})</span>} {said && <i>- {said}</i>}
						</>}
				</p>
			))}
			</ul>
		</>
	}
	return <></>
}

const Comments = ({ comments = [] }) => {
	if (comments.length) {
		return <>
			<SectionHeader text="Comments" />
			{comments.map(({ who, date, said, source }, key) => (
				<p key={key} className="row">
					<div style={{ padding: '10px' }}>
						<i>{said}</i>
						<div style={{ padding: '10px' }}>
							<Who who={who} />
							{exists(date) && makeDate(date)}
							{exists(source) && makeSource(source)}
						</div>
					</div>
				</p>
			))}
		</>
	}
	return <></>
}

const Auxiliary = ({ type, artist, title, tracks, addendum = [] }) => {
	if (addendum.length) {
		const href = makeReleaseLink(artist || tracks[0].artist, title || tracks[0].title);
		return <>
			<SectionHeader text="Auxiliary Materials" />
			<div className="panelContainer">
			{addendum.map((props, key) => (
				<p key={key} className="row">
					<span className="datum">{typeToDisplay(props.type)}</span> : <Link href={`${href}?addendum=${key + 1}`}>{makeSubject(props)}</Link>
				</p>
			))}
			</div>
		</>
	}
	return <></>;
}

const makeRelease = (item) => {
	const link = `${item.type}s`;
	const artist = item.artist || item.tracks[0].artist;
	const release = item.title || item.tracks[0].title;
	const description = `${artist}: "${release}" (${item.type})`;
	return <Page link={link} description={description} >
		<CommonHeader {...item} />
		<Tracks {...item} />
		<Credits {...item} />
		<LinerNotes {...item} />
		<Comments {...item} />
		<Sales {...item} />
		<Auxiliary {...item} />
		<YellowSheets {...item} />
		<Reels {...item } />
	</Page>
}

const matchReleaseName = (url = '', artist = '', title = '') => {
	const useUrl = url.replace(/-7$/, '').split('_').join('').toLowerCase();
	const useTest = (makeReleaseLink(artist, title) || '').split('_').join('').toLowerCase();
	return (useUrl === useTest);
}

const Release = ({ url, addendum }) => {
	let item;
	if (url && url.match(/-7$/)) {
		// if the URL ends w/ '-7', then only look in singles.
		item = releases.find(r => r.type === 'single' && matchReleaseName(`/releases/${url}`, r.artist || r.tracks[0].artist, r.title || r.tracks[0].title));
	} else {
		// otherwise, look first in albums
		item = releases.find(r => r.type === 'album' && matchReleaseName(`/releases/${url}`, r.artist || r.tracks[0].artist, r.title || r.tracks[0].title));
		if (!item) {
			// and then in singles
			item = releases.find(r => r.type === 'single' && matchReleaseName(`/releases/${url}`, r.artist || r.tracks[0].artist, r.title || r.tracks[0].title));
		}
		// and then in demos
		if (!item) {
			// and then in demos
			item = releases.find(r => r.type === 'demo' && matchReleaseName(`/releases/${url}`, r.artist || r.tracks[0].artist, r.title || r.tracks[0].title));
		}
	}
	if (item) {
		if (addendum) {
			const X = parseInt(addendum, 10);
			const add = item.addendum[X - 1];
			if (add) {
				return makeAddendum(item, X)
			}
		}
		return makeRelease(item)
	}
	// fallback
	if (!item) {
	return <Page title="Albums" link="albums" description="The Albums">
		<Albums />
	</Page>
	}
}

export default Release
