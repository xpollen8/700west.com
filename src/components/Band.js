import Image from 'next/image';
import Link from 'next/link';
import Page from './Page';
import MakeDate from './MakeDate';
import bands from '../lib/bands';

import { getBodyHTML, publicityByBand, getBandNames, releasesByBand, musiciansByBand, makeMusicianLink, makeBandLink, makeReleaseLink, showAttribution, Datum } from '../lib/helpers';

const Publicity = (band) => {
	const publicity = publicityByBand(band)[0]?.publicity;
	if (publicity?.length) {
		return <>
			<h3>Promo Material</h3>
			<ul className="row">
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
	const releases = releasesByBand(band)?.filter(r => r.type !== 'demo');
	const demos = releasesByBand(band)?.filter(r => r.type === 'demo');
	const released = releases.filter(r => r?.artist !== 'Various Artists');
	const appeared = releases.filter(r => r?.artist === 'Various Artists');

	const ReleaseType = ({ label, data }) => {
		if (!(data && data.length)) return <></>;
		return (<>
			<h3>{label}</h3>
				<div className="row">
				{data.map((r, key) => {
				const title = (r.type === 'single') ? (r?.title || r?.tracks[0]?.title) : r?.title;
				const useBand = (r.type === 'single') ? (r?.artist || r?.tracks[0]?.artist) : r?.artist;
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
			</div>
		</>)
	}

	return (
			<>
				<ReleaseType label={'Released'} data={released} />
				<ReleaseType label={'Demos'} data={demos} />
				<ReleaseType label={'Appeared On'} data={appeared} />
			</>
		)
};

const Musicians = ({ band }) => {
	const musicians = musiciansByBand(band);
	if (!musicians?.length) { return <></> }
	return (
			<>
				<h3>Credits</h3>
				<div className="row">
				{musicians.map((mus, key) => {
					return (
						<li key={key}>
							<a href={makeMusicianLink(mus)}>{mus}
						</a>
					</li>);
				})}
			</div>
			</>
		)
};

const Bio = ({ band }) => {
	const bio = bands[band]?.bio;
	if (!bio?.body) return <></>;
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

const Gallery = ({ band }) => {
	const images = bands[band]?.images;
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
					{date && <Datum k="Added" v={MakeDate(date)} />}
					</li>
				</div>
			);
		})}
		</div>
	);
}

const Band = ({ url }) => {
	const band = getBandNames().find(b => makeBandLink(b) === `/band/${url}`);
	if (!band) { return <>404</> }
	return (
		<Page link="/bands" description={`Band: ${band}`}>
			<div className="artist"><b>{band}</b></div>
			<div className="row">
			<Bio band={band} />
			<Gallery band={band} />
			<Publicity band={band} />
			<Releases band={band} />
			<Musicians band={band} />
			</div>
		</Page>
	);
}

export default Band;
