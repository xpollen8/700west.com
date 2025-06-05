import { isRelease, makeReleaseLink, autoLink } from '../lib/helpers';

const MaybeReleaseLink = (artist='', title='') => {
	if (!isRelease(artist, title)) return <><b><div dangerouslySetInnerHTML={ { __html: autoLink(artist) }} ></div></b> - {title}</>;
	return (
		<a href={`${makeReleaseLink(artist, title)}`}><b>{artist}</b> - {title}</a>
	)
}

export default MaybeReleaseLink;
