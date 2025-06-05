import { isRelease, makeReleaseLink, autoLink } from '../lib/helpers';

const MaybeReleaseLink = (artist='', title='') => {
	if (!isRelease(artist, title)) return <><b>{autoLink(artist)}</b> - {autoLink(title)}</>;
	return (
		<a href={`${makeReleaseLink(artist, title)}`}><b>{artist}</b> - {title}</a>
	)
}

export default MaybeReleaseLink;
