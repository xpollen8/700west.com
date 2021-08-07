import Image from 'next/image';
import { Page } from '../pages/_app';
import releases from '../lib/releases';
import { SectionHeader, makeReleaseLink, AudioPlayer, typeToDisplay, makeSubject, FormatDate, makeDate } from '../lib/helpers';
import Albums from './Albums';
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'

const makeAuthor = (author, authorContact) => {
	if (authorContact) {
		return <>
			{author} {makeContact(authorContact)}
		</>
	} else {
		return author;
	}
}

const makeContact = (authorContact) => {
	if (authorContact) {
		const ret = authorContact.match(/@/) ? `mailto:${authorContact}` : authorContact;
		return <span className="contact">
			<a href={ret} target="new">{authorContact}</a>
		</span>;
	}
}

const makeBody = (body) => {
	if (body) {
		return <>{body}</>
	}
}

const makeOriginal = (original) => {
	if (original) {
		return <span className="original">
			<a href={original} target="new">{original}</a>
		</span>
	}
}

const Addendum = ({ location, original, source, credit, date, type, author, authorContact, title, body, artist, release, releaseLink, number }) => (
	<>
		<span className="artist">{artist}</span> : <a href={releaseLink} className="title">{release}</a>
		<hr/>
		<div className="header">
			<Datum k="Source" v={source} />
			<Datum k="Location" v={location} />
			<Datum k="Type" v={typeToDisplay(type)} />
			<Datum k="Author" v={makeAuthor(author, authorContact)} />
			<Datum k="Published" v={makeDate(date)} />
			<Datum k="Original" v={makeOriginal(original)} />
		</div>
		<hr/>
		{title &&
			<p>
				<b>{title}</b>
			</p>
		}
		{makeBody(body)}
	</>
)

const makeAddendum = (item, addendum = 0) => {
	const add = item.addendum && item.addendum.find((x, i) => i === addendum - 1);
	const link = (item.type === 'album') ? 'albums' : 'singles';
	const artist = item.artist || item.tracks[0].artist;
	const release = item.title || item.tracks[0].title;

	return <Page title="Releases" link={link} description={makeSubject(add)} >
		{add && <Addendum {...add} artist={artist} release={release} releaseLink={makeReleaseLink(artist, release)} number={addendum} />}
	</Page>
}

const Covers = (release) => {
	return <div className="release panel">
		{release.image.map((i, key) => (
		<a key={key} href={`/images/covers/${i.file}`}><Image
			src={`/images/covers/${i.thumb}`}
			height="125"
			width="125"
			alt="image" /></a>
		))}
	</div>
}

const exists = (v) => v && v.length;

const AudioTeaser = ({ tracks = [] }) => {
	const haveAudio = tracks.filter(t => (t.audio && t.audio.length));
	if (haveAudio.length) {
		return <div className="release teaser">{haveAudio.length} audio sample{haveAudio.length > 1 ? 's' : ''} available below!</div>
	} else {
		return <></>
	}
}

const Datum = ({ k, v, className }) => {
	if (exists(v) || typeof v === 'object') {
		return <div>
			<span className="datum"> {k} </span>:
			<span className={className}> {v} </span>
		</div>
	}
	return <>{v}</>
}

const Who = ({ who = '', whoLink = '' }) => {
	if (who.length) {
		if (whoLink.length) {
			return <div className="who">
				<a href={whoLink} target="new">{who}</a>
			</div>
		} else {
			return <div className="who">
				{who}
			</div>
		}
	}
	return <></>;
}

const TrackCredits = ({ credits = [] }) => {
	if (credits.length) {
		return <>
			<div className="datum">Song Credits</div>
			<blockquote>
				{credits.map((c, key) => {
					return <p key={key}>
						<Who {...c} /> <p>{c.did.join(', ')}</p>
					</p>
				})}
			</blockquote>
		</>
	}
	return <></>
}

const TrackComments = ({ comments = [] }) => {
	if (comments.length) {
		return <>
			<div className="datum">Comments</div>
				{comments.map((c, key) => {
					return <blockquote key={key} className="row">
						<i>{c.said}</i>
						<Who who={c.who} whoLink={c.whoLink} />
						{exists(c.date) && makeDate(c.date)}
					</blockquote>
				})}
		</>
	}
	return <></>;
}

const Title = ({ title = '', time = '' }) => {
	if (title.length && time.length) {
		return <div>
			<span className="artist">{title}</span>
			<span className="date ago">{time}</span>
		</div>
	} else {
			return <div className="artist">{title}</div>
	}
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
	<li value={data.tracknum} className="row" style={{ margin: "3px" }} key={key}>
		<Title title={data.title} time={data.time} />
		{!!(exists(data.audio) || exists(data.mastering) || exists(data.writer) || exists(data.publisher) || exists(data.affiliation) || exists(data.comments) || exists(data.credits)) && <hr/>}
		{exists(data.audio) && 
			<AudioPlayer mp3={data.audio} />
			}
		<Datum k="Mastering" v={data.mastering} />
		<Datum k="Writer" v={data.writer} className='who' />
		<Published publisher={data.publisher} affiliation={data.affiliation} />
		<TrackComments comments={data.comments} />
		<TrackCredits credits={data.credits} />
	</li>
)

const Panel = ({ side, tracks }) => {
	if (side) {
		return <div className="release panel">
			<SectionHeader text={`${side} Side`} />
			<ol>
				{tracks.filter(t => t.side === side).map(Track)}
			</ol>
			</div>
	} else {
		return <>
			<SectionHeader text="Tracks" />
			<ol>
				{tracks.map(Track)}
			</ol>
			</>
	}
}

const HeaderData = (release) => (
	<>
		<div className="header">
			<Datum k="Published" v={release.published} />
			<Datum k="Label" v={release.label} />
			<Datum k="Serial" v={release.id} />
			<Datum k="Contact" v={release.url} />
		</div>
		<AudioTeaser {...release} />
	</>
)

const MakeSingle = (single) => (
	<>
		<div className="release sides">
			<div className="release panel">
				<div className="release artist">{single.tracks[0].artist}</div>
				<div className="release title">"{single.tracks[0].title}"</div>
				<div><i>b/w</i></div>
				{!!(single.tracks[0].artist !== single.tracks[1].artist) &&
					<div className="release artist">{single.tracks[1].artist}</div>
				}
				<div className="release title">"{single.tracks[1].title}"</div>
				<HeaderData {...single} />
			</div>
			<Covers {...single } />
		</div>
		<div className="release sides">
			<Panel side='A' tracks={single.tracks} key={1} />
			<Panel side='B' tracks={single.tracks} key={2} />
		</div>
	</>
)

const AlbumHeader = (release) => (
	<>
	<div className="release sides">
		<div className="release panel">
			<div className="release artist">{release.artist}</div>
			<div className="release title">"{release.title}"</div>
			<HeaderData {...release} />
		</div>
		<Covers {...release } />
	</div>
	</>
)

const MakeAlbum = (album) => {
	const hasTracks = album.tracks[0];
	const hasSides = album.tracks[0]?.side.length;
	if (hasSides) {
		return <>
			<AlbumHeader {...album} />
			<div className="release sides">
				<Panel side='A' tracks={album.tracks} key={1} />
				<Panel side='B' tracks={album.tracks} key={2} />
			</div>
		</>
	} else if (hasTracks) {
		return <>
			<AlbumHeader {...album} />
			<Panel tracks={album.tracks} />
		</>
	}
	return <AlbumHeader {...album} />
}

const Credits = ({ credits = [] }) => {
	if (credits.length) {
		return <>
			<SectionHeader text="Credits" />
			<blockquote>
			{credits.map(({ who, whoLink, did }, key) => (
				<p key={key}>
					<Who who={who} whoLink={whoLink} /> {did.join(', ')}
				</p>
			))}
			</blockquote>
		</>
	}
	return <></>;
}

const LinerNotes = ({ liner = '' }) => {
	if (liner.length) {
		return <>
			<SectionHeader text="Liner Notes" />
			<blockquote>
				{liner}
			</blockquote>
		</>
	}
	return <></>;
}

const Promo = ({ publicity = [] }) => {
	if (publicity.length) {
		return <>
			<SectionHeader text="Original Promotional Material " />
			<ul>
			{publicity.map(({ image, width, height }, key) => (
				<li key={key}>
					<a href={`/images/publicity/${image}.jpg`}><Image
						src={`/images/publicity/${image}.gif`}
						alt="publicity shot"
						width={width} height={height} /></a>
				</li>
			))}
			</ul>
		</>
	}
	return <></>;
}

const Comments = ({ comments = [] }) => {
	if (comments.length) {
		const sales = comments.filter(c => c.type === 'sale');
		const other = comments.filter(c => c.type !== 'sale');
		const getSales = () => {
			if (sales.length) {
					const original = { name: 'Original', data: {} };
					const reissue = { name: 'Re-Issue', data: {} };
					const sorted = sales.sort((a, b) => new Date(a.date) - new Date(b.date)).map(({ date, said }) => {
						const price = said.match(/\$([(0-9,)+.?(0-9)*]+)/);
						if (price && price[1]) {
							if (said.match(/issue/i)) {
								reissue.data[date] = price[1];
							} else {
								original.data[date] = price[1].replace(',', '');
							}
						}
						return { date, said };
					})
					const data = [
						original, reissue
					];
					return <>
						<SectionHeader text="Sales History" />
						<LineChart adapter="chartjs" data={data} />
						<ul>
						{sorted.map(({ who, whoLink, date, said, type }, key) => (
							<p key={key} className="row">
									{exists(date) && <>
										{FormatDate(date)} - <i>{said}</i>
									</>}
							</p>
						))}
						</ul>
					</>
				}
				return <></>
			}
		const getComments = () => {
			if (other.length) {
				return <>
					<SectionHeader text="Comments" />
					{other.map(({ who, whoLink, date, said, type }, key) => (
						<p key={key} className="row">
							<div style={{ padding: '10px' }}>
								<i>{said}</i>
								<div style={{ padding: '10px' }}>
									<Who who={who} whoLink={whoLink} />
									{exists(date) && makeDate(date)}
								</div>
							</div>
						</p>
					))}
				</>
			}
			return <></>
		}
		return <>
			{getComments()}
			{getSales()}
		</>
	}
	return <></>;
}

const Extra = ({ type, artist, title, tracks, addendum = [] }) => {
	if (addendum.length) {
		const href = makeReleaseLink(artist || tracks[0].artist, title || item.tracks[0].title);
		return <>
			<SectionHeader text="Auxiliary Materials)" />
			{addendum.map((props, key) => (
				<p key={key} className="row">
					<span className="datum">{typeToDisplay(props.type)}</span> : <a href={`${href}?addendum=${key + 1}`}>{makeSubject(props)}</a>
				</p>
			))}
		</>
	}
	return <></>;
}

const makeRelease = (item) => {
	const link = (item.type === 'album') ? 'albums' : 'singles';
	const artist = item.artist || item.tracks[0].artist;
	const release = item.title || item.tracks[0].title;
	return <Page title="Releases" link={link} description={`The "${release}" ${item.type} from ${artist}`} >
		{(item.type === 'album') ? <MakeAlbum {...item} /> : <MakeSingle {...item } />}
		<Credits {...item} />
		<LinerNotes {...item} />
		<Promo {...item} />
		<Comments {...item} />
		<Extra {...item} />
	</Page>
}

const matchReleaseName = (url = '', artist = '', title = '') => {
	const useUrl = url.split('_').join('').toLowerCase();
	const useTest = (makeReleaseLink(artist, title) || '').split('_').join('').toLowerCase();
	return (useUrl === useTest);
}

const Release = ({ url, addendum }) => {
	const item = releases.find(r => matchReleaseName(`/releases/${url}`, r.artist || r.tracks[0].artist, r.title || r.tracks[0].title));
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
	return <Page title="Albums" link="albums" description="The Albums">
		<Albums />
	</Page>
}

export default Release
