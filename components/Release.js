import { Page } from '../pages/_app';
import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';
import { makeReleaseLink } from '../lib/helpers';
import Albums from './Albums';

const FormatDate = ({ date = new Date() }) => {
	const dt = new Date(date).toISOString().slice(0,10);
	return <>{dt}</>
}

const typeToDisplay = (type) => {
	const	types = [
		[ 'interview', 'Interview' ],
		[ 'liner', 'Liner Notes' ],
		[ 'auction', 'Auction Review' ],
		[ 'review', 'Review' ],
		[ 'session', 'Session Notes' ],
		[ 'reminiscence', 'Reminiscence' ],
		[ 'photos', 'Photographs' ],
	];
	const item = types.find(t => t[0] === type);
	return (item) ? item[1] : '';
}

const displayDate = (date) => {
	if (date) {
		return new Date(date).toISOString().slice(0,10);
	}
}

const	makeSubject = (props) => {
	const { title, location, source, type } = props;
	const display = title || [source, typeToDisplay(type), location].filter(x => x).join(' - ');
	return display;
}

const makeContact = (authorContact) => {
	if (authorContact) {
		const ret = authorContact.match(/@/) ? `mailto:${authorContact}` : authorContact;
		return <span className="contact">
			<a href={ret} target="new">{authorContact}</a>
		</span>;
	}
}

const makeDate = (date) => {
	if (date) {
		const ret = new Date(date).toISOString().slice(0,10);
		const Difference_In_Time = new Date().getTime() - new Date(date).getTime();
		const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		const Difference_In_Years = Difference_In_Days / (365.25);

		const ago = ((Difference_In_Years > 1) ? `${Math.floor(Difference_In_Years)} yrs` : `${Math.ceil(Difference_In_Days)} days`) + ` ago`;
		return <span className="date">{ret}<span className="date ago">{ago}</span></span>
	}
}

const makeBody = (body) => {
	if (body) {
		return <>{body}</>
	}
}

const makeOriginal = (original) => {
	if (original) {
		return <div className="original">
			Swiped from:
			<a href={original} target="new">{original}</a>
		</div>
	}
}

const Addendum = ({ location, original, source, credit, date, type, author, authorContact, title, body, artist, release, releaseLink, number }) => (
	<>
		<div className="header">
		<div className="artist">{artist}</div>
		:
		<a href={releaseLink} className="title">{release}</a>
		<hr/>
		{source && <div>Source: <div className="datum">{source}</div></div>}
		{location && <div>Location: <div className="datum">{location}</div></div>}
		{type && <div>Type: <div className="datum">{typeToDisplay(type)}</div></div>}
		{author && <div>Author: <div className="datum">{author}{makeContact(authorContact)}</div></div>}
		{date && <div>Published: <div className="datum">{makeDate(date)}</div></div>}
		{makeOriginal(original)}
		</div>
		<hr/>
		{title &&
			<div className="subject">
				{title}
			</div>
		}
		{makeBody(body)}
	</>
)

const makeAlbumBlurb = (item, key) => {
	const href = makeReleaseLink(item.artist, item.title);

	return <a className="cover" key={key} href={href}><img
		border="1" src={`${process.env.NEXT_PUBLIC_IMAGES}/covers/${item.image[0].thumb}`}
		alt={`${item.artist} - ${item.image[0].name}`}
		width={item.image[0].width}
		height={item.image[0].height} /></a>
}

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
	return release.image.map((i, key) => (
		<a key={key} href={`${process.env.NEXT_PUBLIC_IMAGES}/covers/${i.file}`}><img
			src={`${process.env.NEXT_PUBLIC_IMAGES}/covers/${i.thumb}`}
			height="125"
			width="125"
			alt="image" /></a>
	));
}

const exists = (v) => v && v.length;

const AudioTeaser = (release) => {
	const haveAudio = release.tracks.filter(t => exists(t.audio));
	if (haveAudio.length) {
		return <div className="release teaser">{haveAudio.length} audio sample{haveAudio.length > 1 ? 's' : ''} available below!</div>
	} else {
		return <></>
	}
}

const Datum = ({ k, v }) => {
	if (exists(v)) {
		return <div>
			<span className="track datum"> {k} </span>:
			<span> {v} </span>
		</div>
	} else {
		return <></>
	}
}

const Who = ({ who, whoLink }) => {
	if (exists(who)) {
		if (exists(whoLink)) {
			return <>
				<a href={whoLink} target="new">{who}</a> -
			</>
		} else {
			return <>
				{who} -
			</>
		}
	} else {
		return <></>;
	}
}

const TrackCredits = ({ credits }) => {
	if (exists(credits)) {
		return <>
			<div className="track datum">Song Credits</div>
			<ul>
				{credits.map((c, key) => {
					return <li key={key}>
						<Who {...c} /> <span>{c.did.join(', ')}</span>
					</li>
				})}
			</ul>
		</>
	} else {
		return <></>
	}
}

const TrackComments = ({ comments }) => {
	if (exists(comments)) {
		return <>
			<div className="track datum">Comments</div>
			<ul>
				{comments.map((c, key) => {
					return <li key={key}>
						{exists(c.who) && <>{c.who} -</>}
						<i>{c.said}</i>
						{exists(c.date) && <span className="date ago">{c.date}</span>}
					</li>
				})}
			</ul>
		</>
	} else {
		return <></>
	}
}

const Title = ({ title, time }) => {
	if (title && exists(time)) {
		return <div>
			<span className="artist">{title}</span>
			<span className="date ago">{time}</span>
		</div>
	} else {
			return <div className="artist">{title}</div>
	}
}

const Published = ({ publisher, affiliation }) => {
	if (exists(publisher) && exists(affiliation)) {
		return <Datum k="Publisher" v={`${publisher} (${affiliation})`}/>;
	} else if (exists(publisher)) {
		return <Datum k="Publisher" v={publisher} />;
	} else if (exists(affiliation)) {
		return <Datum k="Affiliation" v={affiliation} />;
	} else {
		return <></>;
	}
}

const Track = (data) => (
	<li value={data.tracknum} className="row" style={{ margin: "3px" }}>
		<Title title={data.title} time={data.time} />
		<hr/>
		{exists(data.audio) && <div>
			<a href={`${process.env.NEXT_PUBLIC_AUDIO}/${data.audio}`}><img
			src={`${process.env.NEXT_PUBLIC_IMAGES}/iconMP3.gif`} alt="download" /></a><span className="release teaser">Download</span>
			</div>}
		<Datum k="Mastering" v={data.mastering} />
		<Datum k="Writer" v={data.writer} />
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
				{exists(single.published) && <div className="release year">Published: {single.published}</div>}
				{exists(single.label) && <div className="release label">Label: {single.label}</div>}
				{exists(single.id) && <div className="release id">Serial: {single.id}</div>}
				<AudioTeaser {...single} />
			</div>
			{!!(single.image && single.image.length) &&
				<div className="release panel">
					<Covers {...single } />
				</div>
			}
		</div>
		<div className="release sides">
			<Panel side='A' tracks={single.tracks} />
			<Panel side='B' tracks={single.tracks} />
		</div>
	</>
)

const Header = (release) => (
		<div className="release sides">
		<div className="release panel">
			<div className="release artist">{release.artist}</div>
			<div className="release title">"{release.title}"</div>
			{exists(release.published) && <div className="release year">Published: {release.published}</div>}
			{exists(release.label) && <div className="release label">Label: {release.label}</div>}
			{exists(release.id) && <div className="release id">Serial: {release.id}</div>}
			{exists(release.url) && <div className="release id">Contact: {makeContact(release.url)}</div>}
			<AudioTeaser {...release} />
		</div>
		{exists(release.image) &&
			<div className="release panel">
				<Covers {...release } />
			</div>
		}
	</div>
)

const MakeAlbum = (album) => {
		const hasSides = album.tracks[0].side.length;
		if (hasSides) {
			return <>
				<Header {...album} />
				<div className="release sides">
					<Panel side='A' tracks={album.tracks} />
					<Panel side='B' tracks={album.tracks} />
				</div>
			</>
		} else {
			return <>
				<Header {...album} />
				<Panel tracks={album.tracks} />
			</>
		}
}

const Credits = ({ credits }) => {
	if (exists(credits)) {
		return <>
			<SectionHeader text="Credits" />
			<ul>
			{credits.map(({ who, whoLink, did }, key) => (
				<li key={key}>
					<b><Who who={who} whoLink={whoLink} /></b> {did.join(', ')}
				</li>
			))}
			</ul>
		</>
	}
	return <></>;
}

const LinerNotes = ({ liner }) => {
	if (exists(liner)) {
		return <>
			<SectionHeader text="Liner Notes" />
			<blockquote>
				{liner}
			</blockquote>
		</>
	}
	return <></>;
}

const Promo = ({ publicity }) => {
	if (exists(publicity)) {
		return <>
			<SectionHeader text="Original Promotional Material " />
			<ul>
			{publicity.map(({ image, width, height }, key) => (
				<li key={key}>
					<a href={`${process.env.NEXT_PUBLIC_IMAGES}/publicity/${image}.jpg`}><img
						src={`${process.env.NEXT_PUBLIC_IMAGES}/publicity/${image}.gif`}
						alt="publicity shot"
						width={width} height={height} /></a>
				</li>
			))}
			</ul>
		</>
	}
	return <></>;
}

const Comments = ({ comments }) => {
	if (exists(comments)) {
		return <>
			<SectionHeader text="Comments" />
			<ul>
			{comments.map(({ who, whoLink, date, said, type }, key) => (
				<li key={key} style={{ display: 'flex', padding: '3px' }} className="row">
					<div style={{ width: '50%' }}>
						<i>{said}</i>
					</div>
					<div style={{ width: '50%' }}>
						<Who who={who} whoLink={whoLink} />
						{exists(date) && <FormatDate date={date} />}
					</div>
				</li>
			))}
			</ul>
		</>
	}
	return <></>;
}

const Extra = ({ type, artist, title, tracks, addendum }) => {
	if (exists(addendum)) {
		const href = makeReleaseLink(artist || tracks[0].artist, title || item.tracks[0].title);
		return <>
			<SectionHeader text="Auxiliary Materials)" />
			<ul>
			{addendum.map((props, key) => (
				<li key={key}>
					<a href={`${href}?addendum=${key + 1}`}>{makeSubject(props)}</a>
				</li>
			))}
			</ul>
			<p>
			</p>
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
