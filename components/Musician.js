import Image from 'next/image';
import Link from 'next/link';
import { Page } from '../pages/_app';

import { makeReleaseLink, makeBandLink, makeDate } from '../lib/helpers';
import { getMusicianNames, bandsByMusician, releasesByMusician, makeMusicianLink, AKAs, isAKA, cleanName } from './Muso';
import musicianExtra from '../lib/musicians';

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
			<>
				<h3>Credits On</h3>
				<div className="row">
				{releases.map(Release)}
				</div>
			</>
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

const showAttribution = (attr) => {
	const { original, author, date } = attr || {};
	if (!(original || author || date)) return <></>;
	return (
		<div className="row">
			<Datum k="Source" v={original} />
			<Datum k="Author" v={author} />
			{exists(date) && makeDate(date)}
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
				{bio?.body}
			{showAttribution(bio?.attribution)}
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
						<blockquote>
						{caption}
						</blockquote>
					{showAttribution(attribution)}
					{date && makeDate(date)}
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
		<div className="who">
			<Link href={makeMusicianLink(who)}>{who}</Link>
		</div>
	);
}

const TrackComments = ({ comments = [] }) => {
	if (comments.length) {
		return <>
			<div className="datum">Comments</div>
				{comments.map((c, key) => {
					return <div key={key} className="row">
						<i>{c.said}</i>
						<Who who={c.who} />
						{exists(c.date) && makeDate(c.date)}
					</div>
				})}
		</>
	}
	return <></>;
}

const showComments = (comments) => {
	return <>(comments)</>;
}

const embedVideo = (v, key) => {
	const { date, src, thumb, comments, attribution } = v || {};
	return (
		<div key={key}>
		<video controls preload="none" style={{ maxWidth: '100%' }} poster={thumb?.src}>
				<source src={src} type="video/mp4" />
		</video>
		<div className="row">
			{showAttribution(attribution)}
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

const Contact = ({ musician }) => {
	const contact = musicianExtra[musician]?.contact || {};
	if (!(Object.keys(contact)?.length)) return <></>;
	return (
		<div>
			<h3>Contact</h3>
			{contact?.website && <li className="row"><Link href={contact.website}>{contact.website}</Link></li>}
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
			</center>
			<div className="row">
			<div className="panelContainer">
				<Bio musician={musician} />
				<Contact musician={musician} />
			</div>
			<CreditsOn musician={musician} />
			<Gallery musician={musician} />
			<Videos musician={musician} />
			</div>
		</Page>
	);
}

export default Musician;

/*
<head>
	<link href="//vjs.zencdn.net/7.10.2/video-js.min.css" rel="stylesheet">
	<script src="//vjs.zencdn.net/7.10.2/video.min.js"></script>
</head>

<div class="carousel-wrapper" style="border: 1px solid; border-radius: 5px; border-color: #999; padding-bottom: 20px;">
  <div class="carousel">

** LOOP **
<div class="carousel__photo">
<div class="card">
** CONTENT**
</div>
</div>
** END LOOP
    <div class="carousel__button--next"></div>
    <div class="carousel__button--prev"></div>
</div>
</div>

<script>
!(function(d){
  var itemClassName = "carousel__photo";
    items = d.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true;
// Set classes
function setInitialClasses() {
  // Targets the previous, current, and next items
  // This assumes there are at least three items.
  items[totalItems - 1].classList.add("prev");
  items[0].classList.add("active");
  items[1].classList.add("next");
}
// Set event listeners
function setEventListeners() {
  var next = d.getElementsByClassName('carousel__button--next')[0],
      prev = d.getElementsByClassName('carousel__button--prev')[0];
  next.addEventListener('click', moveNext);
  prev.addEventListener('click', movePrev);
}
// Next navigation handler
function moveNext() {
  // Check if moving
  if (!moving) {
    // If it's the last slide, reset to 0, else +1
    if (slide === (totalItems - 1)) {
      slide = 0;
    } else {
      slide++;
    }
    // Move carousel to updated slide
    moveCarouselTo(slide);
  }
}
// Previous navigation handler
function movePrev() {
  // Check if moving
  if (!moving) {
    // If it's the first slide, set as the last slide, else -1
    if (slide === 0) {
      slide = (totalItems - 1);
    } else {
      slide--;
    }
          
    // Move carousel to updated slide
    moveCarouselTo(slide);
  }
}

function disableInteraction() {
  // Set 'moving' to true for the same duration as our transition.
  // (0.5s = 500ms)
  
  moving = true;
  // setTimeout runs its function once after the given time
  setTimeout(function(){
    moving = false
  }, 500);
}

function moveCarouselTo(slide) {
  // Check if carousel is moving, if not, allow interaction
  if(!moving) {
    // temporarily disable interactivity
    disableInteraction();
    // Update the "old" adjacent slides with "new" ones
    var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;
    // Test if carousel has more than three items
    if ((totalItems - 1) > 3) {
      // Checks and updates if the new slides are out of bounds
      if (newPrevious <= 0) {
        oldPrevious = (totalItems - 1);
      } else if (newNext >= (totalItems - 1)){
        oldNext = 0;
      }
      // Checks and updates if slide is at the beginning/end
      if (slide === 0) {
        newPrevious = (totalItems - 1);
        oldPrevious = (totalItems - 2);
        oldNext = (slide + 1);
      } else if (slide === (totalItems -1)) {
        newPrevious = (slide - 1);
        newNext = 0;
        oldNext = 1;
      }
      // Now we've worked out where we are and where we're going, 
      // by adding/removing classes we'll trigger the transitions.
      // Reset old next/prev elements to default classes
      items[oldPrevious].className = itemClassName;
      items[oldNext].className = itemClassName;
      // Add new classes
      items[newPrevious].className = itemClassName + " prev";
      items[slide].className = itemClassName + " active";
      items[newNext].className = itemClassName + " next";
    }
  }
}


function initCarousel() {
  setInitialClasses();
  setEventListeners();
  // Set moving to false so that the carousel becomes interactive
  moving = false;
}

// make it rain
initCarousel();
}(document));
</script>
*/
