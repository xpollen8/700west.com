import Image from 'next/image';
import { Page } from '../pages/_app';

import Link from 'next/link';
import { publicityByBand, getBandNames, releasesByBand, musiciansByBand, makeMusicianLink } from './Muso';
import { SectionHeader, makeBandLink, makeReleaseLink } from '../lib/helpers';

const Publicity = (band) => {
	const publicity = publicityByBand(band)[0]?.publicity;
	console.log("Publicity", publicity);
	if (publicity?.length) {
		return <>
			<SectionHeader text="Original Promotional Material" />
			<ul>
			{publicity.map(({ image, width, height, caption }, key) => (
				<li key={key}>
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

const Releases = ({ band }) => {
	const releases = releasesByBand(band);
	if (!releases?.length) { return <></> }
	const released = releases.filter(r => r?.artist !== 'Various Artists');
	const appeared = releases.filter(r => r?.artist === 'Various Artists');
	return (
			<>
				<Publicity band={band} />
				{!!(released?.length) && <>
				<h3>Released</h3>
				{released.map((r, key) => {
					const title = (r.type === 'single') ? (r?.tracks[0]?.title) : r?.title;
					const useBand = (r.type === 'single') ? (r?.tracks[0]?.artist) : r?.artist;
					return (
						<li key={key}>
							<a href={makeReleaseLink(useBand, title)}>
							<>
								{title}
							</>
						</a> {`${(r.type !== 'album') ? `(${r.type})` : ''}`}
						{r?.published && <span className="date ago">{r?.published}</span>}
					</li>);
				})}
				</>}
				{!!(appeared?.length) && <>
				<h3>Appeared On</h3>
				{appeared.map((r, key) => {
					const title = (r.type === 'single') ? (r?.tracks[0]?.title) : r?.title;
					const useBand = (r.type === 'single') ? (r?.tracks[0]?.artist) : r?.artist;
					return (
						<li key={key}>
							<a href={makeReleaseLink(useBand, title)}>
							<>
								{title} {`${(r.type !== 'album') ? `(${r.type})` : ''}`}
							</>
						</a>
						{r?.published && <span className="date ago">{r?.published}</span>}
					</li>);
				})}
				</>}
			</>
		)
};

const Musicians = ({ band }) => {
	const musicians = musiciansByBand(band);
	if (!musicians?.length) { return <></> }
	return (
			<>
				<h3>Musicians</h3>
				{musicians.map((mus, key) => {
					return (
						<li key={key}>
							<a href={makeMusicianLink(mus)}>{mus}
						</a>
					</li>);
				})}
			</>
		)
};

const Band = ({ url }) => {
	const band = getBandNames().find(b => makeBandLink(b) === `/band/${url}`);
	if (!band) { return <>404</> }
	return (
		<Page title="Bands" link="bands" description={`Band: ${band}`}>
			<div className="artist"><b>{band}</b></div>
			<hr/>
			<Releases band={band} />
			<Musicians band={band} />
		</Page>
	);
}

export default Band;
