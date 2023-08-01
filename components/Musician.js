import Image from 'next/image';
import Link from 'next/link';
import { Page } from '../pages/_app';

import { maybeReleaseLink, getBodyHTML, makeReleaseLink, makeBandLink, makeDate } from '../lib/helpers';
import { AudioPlayer, getBandNames, getMusicianNames, bandsByMusician, commentsByMusician, releasesByMusician, makeMusicianLink, AKAs, isAKA, cleanName } from './Muso';
import musicianExtra from '../lib/musicians';
import musicianMemoriam from '../lib/memoriam';

const Memoriam = ({ musician }) => {
	const deceased = musicianMemoriam.find(m => m?.name === musician);
	if (!deceased) return <></>;
	return (
		<div className="row">
			{(deceased?.date) && <Datum k={`Deceased`} v={makeDate(deceased?.date)} />}
			{(deceased?.reason) && <Datum k={`Cause`} v={deceased?.reason} />}
			{(deceased?.played) && <Datum k={`Played`} v={deceased?.played} />}
			{(deceased?.for) && <Datum k={`For`} v={(deceased?.forLink) ? <a href={`${deceased?.forLink}`}>{deceased.for}</a> : <>{deceased.for}</>}
			/>}
		</div>
	)
}

const Release = (release, key) => {
	const href = `${makeReleaseLink(release?.artist, release?.title)}${(release?.type === 'single') ? '-7' : ''}`;
	const title = release?.title;
	const type = (release?.type !== 'album') ? `(${release?.type})` : '';
	return (
		<li key={key}>
			<Link href={makeBandLink(release?.artist)}>
				{release?.artist}
			</Link>
				-
				<Link href={href}>{title}</Link> {type}
				{release?.roles && <p className="played">
					"{release?.roles?.join('", "')}"
					</p>
				}
		</li>
	)
}

const CreditsOn = ({ musician }) => {
	const releases = releasesByMusician(musician);
	if (!releases?.length) { return <></> }
	return (
			<div>
				<h3>Credits On</h3>
				<div className="row">
				{releases.map(Release)}
				</div>
			</div>
		)
}

const AKA = ({ musician }) => {
	const aka = AKAs[musician];
	if (!aka) return <></>;
	return (
		<>
		(AKA: "{aka.filter(a => a !== musician).join('", "')}")
		</>
	);
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

const showAttribution = (attr, className) => {
	const { original, who, date, added } = attr || {};
	if (!(original || who || date)) return <></>;
	return (
		<div className={`${className} attribution`}>
			{exists(date) && makeDate(date)}
			<Datum k="Source" v={original} />
			{who && <Datum k="Author" v=<Who who={who} /> />}
			{added && <Datum k="Added" v={makeDate(added)} />}
		</div>
	);
}

const Bio = ({ musician }) => {
	const bio = musicianExtra[musician]?.bio;
	if (!bio) return <></>;
	return (
		<div>
			<h3>Bio</h3>
			<li className="row">
				<div dangerouslySetInnerHTML={ { __html: getBodyHTML(bio.body) } }></div>
				{showAttribution(bio?.attribution, 'row')}
			</li>
		</div>
	);
}

const Gallery = ({ musician }) => {
	const images = musicianExtra[musician]?.images;
	if (!(images?.length)) return <></>;
	return (
		<div>
		<h3>Gallery</h3>
		{images.map(({ date, src, thumb, caption, attribution }, key) => {
			return (
				<div key={key} className="row">
					<Link href={src}><Image src={thumb?.src} layout='responsive' width={thumb?.width} height={thumb?.height} /></Link>
					<li>
						<i>
						{caption}
						</i>
					{showAttribution(attribution)}
					{date && <Datum k="Added" v={makeDate(date)} />}
					</li>
				</div>
			);
		})}
		</div>
	);
}

const exists = (v) => v && v.length;

const smartLink = (v) => {
	if (typeof v === 'string' && v?.includes('http')) {
		return <Link href={v} target="new">{v}</Link>
	}
	return v;
}

const Who = ({ who = '' }) => {
	if (!who?.length) return <></>;
	return (
			<Link href={makeMusicianLink(who)}>{who}</Link>
	);
}

const TrackComments = ({ comments = [] }) => {
	if (comments.length) {
		return <div>
			<div className="datum">Comments</div>
				{comments.map((c, key) => {
					return <div key={key} className="row">
						<i><div dangerouslySetInnerHTML={{ __html: getBodyHTML(c.said) }}></div></i>
						{showAttribution({
							...c
						}, 'row')}
					</div>
				})}
		</div>
	}
}

const embedVideo = (v, key) => {
	const { date, src, thumb, comments, attribution } = v || {};
	return (
		<div key={key}>
		<video controls preload="none" style={{ maxWidth: '100%' }} poster={thumb?.src}>
				<source src={src} type="video/mp4" />
		</video>
		<div className="panelContainer">
			{showAttribution(attribution, 'row')}
			<TrackComments comments={comments} />
			{date && <div className="date ago">Added: {date}</div>}
		</div>
		</div>
	)
}

/*
#live   if (define(urlClean, ${replace(${url}, https://vimeo.com/, https://player.vimeo.com/video/)}))
#live   endif
#live   if ((getval(local) = yes) || (!getval(url) == .))
            <video controls preload="none" style="max-width: 100%;" poster="${url}_thumbnail.jpg">
                <source src="${url}.mp4" type="video/mp4">
            </video>
#live       if ((getval(anno)) && (getval(${anno})))
                <div class="annotation">
                    ${${anno}}
                </div>
#live       endif
#live   else if (getval(urlClean) == jazzbutcher.com)
#
#   prevent recurision inside iframe
#
    bad url: ${url}
#live   else
            <div class="js-video [vimeo, widescreen]">
                <iframe width="560" height="315" src="${urlClean}?showinfo=0" frameborder="0" allowfullscreen></iframe>
            </div>
#live       if ((getval(anno)) && (getval(${anno})))
                <div class="annotation">
                    ${${anno}}
                </div>
#live       endif
#live   endif
*/

const Videos = ({ musician }) => {
	const videos = musicianExtra[musician]?.videos;
	if (!(videos?.length)) return <></>;
	return (
		<div>
		<h3>Videos</h3>
			{videos.map(embedVideo)}
		</div>
	);
}

const Online = ({ musician }) => {
	const online = musicianExtra[musician]?.online || {};
	if (!(Object.keys(online)?.length)) return <></>;
	return (
		<div>
			<h3>Online</h3>
			{online?.website && <li className="row"><Link href={online.website}>{online.website}</Link></li>}
			{online?.youtube && <li className="row"><Link href={online.youtube}>{online.youtube}</Link></li>}
			{online?.email && <li className="row">Email available upon request</li>}
		</div>
	);
}

const Address = ({ musician }) => {
	const address = musicianExtra[musician]?.address || {};
	if (!(Object.keys(address)?.length)) return <></>;
	return (
		<div>
			<h3>Location</h3>
			<li className="row">
			{address?.city && <span>{address.city}{' '}</span>}
			{address?.state && <span>{address.state}{' '}</span>}
			{address?.postalcode && <span>{address.postalcode}{' '}</span>}
			</li>
		</div>
	);
}

// TODO - search through all comments, body, etc and find
// all which match ANY musician alias.
const Tributes = ({ musician }) => {
	/*
	const reminiscences = musicianExtra[musician]?.reminiscences || {};
	if (!(reminiscences)?.length) return <></>;
	return (
		<div>
			<h3>Others Mention {musician}</h3>
			{reminiscences.map((rem, key) => {
				const { date, source, who, said, subject, audio } = rem;
				return (
					<div className="row">
						{source}
						{subject}
						<div dangerouslySetInnerHTML={ { __html: getBodyHTML(said) } }></div>
						{showAttribution({ original: source, date }, 'row')}
					</div>
				);
			})}
		</div>
	);
	*/
}

const Shares = ({ musician }) => {
	const comments = commentsByMusician(musician);
	if (!(comments)?.length) return <></>;
	return (
		<div>
			<h3>{musician} Says..</h3>
			{comments.map((rem, key) => {
				const { release, track, comment } = rem;
				const { date, source, who, said, subject, audio } = comment;
				return (
					<div className="row">
						{audio && <AudioPlayer source={audio} />}
						<div className="datum">
						Topic:
						</div>
						{subject}
						{' '}
						{(track?.artist && track?.title) && (<>{maybeReleaseLink(track?.artist, track?.title)}</>)}
						{' '}
						{(release?.artist && release?.title) && (<>({maybeReleaseLink(release?.artist, release?.title)})</>)}
						<div className="row" dangerouslySetInnerHTML={ { __html: getBodyHTML(said) } }></div>
						{showAttribution({ original: source, date }, 'row')}
					</div>
				);
			})}
		</div>
	);
}

const Musician = ({ url = '' }) => {
	const cleaned = isAKA(url);
	const musician = getMusicianNames().find(m => cleanName(m) === cleanName(cleaned));
	if (!musician) { return <>404</> }
	return (
		<Page title="Musicians" link="musicians" description={`Musician: ${musician}`}>
			<center><div className="artist"><b>{musician}</b></div>
			<AKA musician={musician} />
			<Memoriam musician={musician} />
			</center>
			<div className="row">
			<div className="panelContainer">
				<Bio musician={musician} />
			<CreditsOn musician={musician} />
			</div>
				<Online musician={musician} />
				<Address musician={musician} />
			<Shares musician={musician} />
			<Tributes musician={musician} />
			<Gallery musician={musician} />
			<Videos musician={musician} />
			</div>
		</Page>
	);
}

export default Musician;
