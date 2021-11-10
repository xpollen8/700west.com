import releases from '../lib/releases';
import { dateCompare, Item } from '../lib/helpers';

const cleanName = (value) => value.replace(/["?'/]/gmi, '').replace(/[^a-z0-9]/gmi, "_").replace(/\s+/g, "_").replace(/__/g, '_').replace(/_$/, '');
const makeMusicianLink = (musician) => `/musician/` + cleanName(isAKA(musician));

const AKAs = {
	'M. J. Whittemore, Jr.': [ 'Mo', 'Moe', 'Mo Whittemore', 'Mo Wittemore*', 'Moe Whittemore', 'M. J. Whittemore, Jr.', 'M. Whittemore Jr' ],
	'Jay Wilfong': [ 'Jay Wilfong', 'William Bonney' ],
	'Arthur Swords': [ 'Shanty' ],
	'Dan Gustin': [ 'Danny Gustin' ],
	'Dave Zerfas': [ 'David Zerfas' ],
	'James Massie': [ 'Red Massie' ],
	'Jack Schaefele': [ 'Jack Schafele', 'Jack Schfele' ],
	'Boobie Townsend': [ 'Master "Boobie" Townsend' ],
	'Jim Hubler': [ 'W. J. Hubler, Jr.' ],
};

const isAKA = (name) => {
	const hasAKA = Object.keys(AKAs).find(a => {
		if (a === name) return name;
		const fnd = AKAs[a]?.find(aka => {
			if (name.match('ittemore')) {
			//console.log("COMP", aka, name, aka.toLowerCase() === name.toLowerCase());
			}
			return cleanName(aka.toLowerCase()) === cleanName(name.toLowerCase())
		});
		return fnd;
	}) || name;
			if (name.match('ittemore')) {
	//console.log("isAKA", { name, hasAKA });
	}
	return hasAKA;
}

const releasesByMusician = (mus) => {
	const uniqueReleases = [].concat(...releases.map(r => {
		const releases = r?.credits?.filter(c => isAKA(c.who) === mus)?.map(c => {
			return ({
				artist: (r.type !== 'single') ? r.artist : `${r.artist || r.tracks[0]?.artist}`,
				title: (r.type !== 'single') ? r.title : `${r.title || r.tracks[0]?.title}`,
				type: r.type,
				roles: c?.did,
			})
		}).filter(f => f) || [];
		const tracks = r?.tracks.map(t => t?.credits?.filter(c => isAKA(c.who) === mus)?.map(c => {
			return ({
				artist: (r.type !== 'single') ? r.artist : r.tracks[0]?.artist,
				title: (r.type !== 'single') ? r.title : r.tracks[0]?.title,
				type: r.type,
				roles: c?.did,
			})
		})).filter(f => f) || [];

		return releases.concat(...tracks);
	}));
	const ret = [];
	uniqueReleases.filter(f => f).forEach(({ artist, title, type, roles }) => {
		const existing = ret.find(u => u.artist === artist && u.title == title && u.type === type);
		if (existing) { // combine onto existing roles
			existing.roles = [...new Set (existing.roles, roles)];
		} else {
			ret.push({ artist, title, type, compilation: (artist === 'Various Artists'), roles });
		}
	});
	return ret.sort((a, b) => ('' + a.artist).localeCompare(b.artist))
}

const	getMusicianNames = () => {
	const uniqueNames = [].concat(...releases.map(r => {
		const credits = r?.credits?.map(c => c.who) || [];
		const tracksCredits = r?.tracks.map(t => t?.credits?.map(c => c.who)) || [];
		return credits.concat(...tracksCredits).filter(f => f);
	}));
	return uniqueNames.map(n => isAKA(n)).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const	getBandNames = () => {
	const X = [].concat(...releases.map(r => {
		const trackArtists = r?.tracks?.map(t => t.artist);
		return [ r?.artist ].concat(trackArtists);
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const	releasesByBand = (band) => {
	const X = [].concat(...releases.filter(r => {
		if (r?.artist === band) { return true };
		if (r?.tracks?.filter(t => t.artist === band)?.length) { return true };
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

const musiciansByBand = (band) => {
	const onReleases = releasesByBand(band);
	const X = [].concat(...onReleases.map(r => {
		const credits = r?.credits?.map(c => c.who) || [];
		const tracksCredits = [];
		r?.tracks?.forEach(t => {
			if (t?.artist === band) {
				const c = t?.credits?.map(c => c.who) || [];
				tracksCredits.push(...c);
			}
		});
		return credits.concat(...tracksCredits).filter(f => f);
	}));
	return X.filter(f => f).filter((v, i, s) => s.indexOf(v) === i).sort();
}

module.exports = { getMusicianNames, releasesByMusician, musiciansByBand, releasesByBand, AKAs, getBandNames, makeMusicianLink, cleanName, isAKA }
