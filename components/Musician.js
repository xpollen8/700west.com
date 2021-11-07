import Image from 'next/image';
import Link from 'next/link';
import { Page } from '../pages/_app';

import { makeReleaseLink, makeBandLink } from '../lib/helpers';
import { getMusicianNames, bandsByMusician, releasesByMusician, makeMusicianLink, AKAs } from './Muso';

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
				{releases.map(Release)}
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

const Musician = ({ url }) => {
	const musician = getMusicianNames().find(m => makeMusicianLink(m) === `/musician/${url}`);
	if (!musician) { return <>404</> }
	return (
		<Page title="Musicians" link="musicians" description={`Musician: ${musician}`}>
			<div className="artist"><b>{musician}</b></div>
			<AKA musician={musician} />
			<hr/>
			<CreditsOn musician={musician} />
		</Page>
	);
}

export default Musician;
