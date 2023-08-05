import { makeReleaseLink } from '../lib/helpers';

const MaybeReleaseLink = (artist='', title='') => {
	if (!isRelease(artist, title)) return <><b>{artist}</b> - {title}</>;
	return (
		<a href={`${makeReleaseLink(artist, title)}`}><b>{artist}</b> - {title}</a>
	)
}

export default MaybeReleaseLink;
