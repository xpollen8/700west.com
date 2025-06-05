import { isRelease, makeReleaseLink, autoLink } from '../lib/helpers';

const MaybeReleaseLink = (artist='', title='') => {
	if (!isRelease(artist, title)) return <><b><span dangerouslySetInnerHTML={ { __html: autoLink(artist) }} ></span></b> - {title}</>;
	return (
		<a href={`${makeReleaseLink(artist, title)}`}><b>{artist}</b> - {title}</a>
	)
}

export default MaybeReleaseLink;
