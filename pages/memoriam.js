import { Page } from './_app';
import { Item } from '../lib/helpers';

const data = [
	{
	name: 'Dan Gustin',
	played: 'Vocals',
	for: 'Spectre',
	forLink: '/releases/Spectre-WFBQ_Homegrown_Album_submission',
	date: '2021-09',
	reason: 'heart attack',
	},
	{
	name: 'Carl Haefli',
	played: 'Trumpet',
	for: 'Ebony Rhythm Funk Campaign',
	date: '1978',
	},
	{
	name: 'Jim Dicks',
	played: 'Bass, Vocals, Songwriter',
	for: 'Granite, Sailor, Iron Horse',
	date: '1984',
	},
	{
	name: 'Herman Walker',
	played: 'Trumpet, Vocals',
	for: 'Amnesty, Ultimate Force',
	date: '?',
	},
	{
	name: 'Master "Boobie" Townsend',
	played: 'Guitar, Vocals',
	for: 'Ebony Rhythm Funk Campaign',
	date: '?',
	},
	{
	name: 'Jack Phelan',
	played: 'Bass',
	for: 'Studio musician',
	date: '2004',
	},
	{
	name: 'Rollin Wood',
	played: 'Percussionist',
	for: 'Maelstrom',
	date: '2002',
	},
	{
	name: 'Bob Williams',
	played: "W'winds, K'bds, Songwriter",
	for: 'Maelstrom',
	date: '2004',
	},
	{
	name: 'Tony Black',
	played: 'Vocalist',
	for: 'Ebony Rhythm Funk Campaign',
	date: '?',
	},
	{
	name: 'Kim Matchett',
	played: 'Percussionist',
	for: 'Malachi',
	date: '?',
	},
	{
	name: 'Jack Schaefele',
	played: 'Saxophones',
	for: 'Malachi',
	date: '2001',
	},
	{
	name: 'Bo Gooliak',
	played: "Bass, kybds; LA studio musician; 1 cut on 'Zerfas' LP",
	for: 'Peddler',
	date: '2008-03-08',
	},
	{
	name: 'Larry Bryant',
	played: 'Multi-inst; vocals;songwriter',
	for: 'Broken Glass (gospel)',
	date: '1990s (mid)',
	},
	{
	name: 'Charlie Smith',
	played: 'Guitar; vocals',
	for: 'Jubal; (+ others out of the area)',
	date: '2008-02',
	},
	{
	name: 'Jeff Cobb',
	played: 'Guitar, vocals, songwriter',
	for: 'Aaron (+ others in area); Beatlesque original material',
	date: '2007-07-01',
	reason: 'Summer, cancer',
	},
	{
	name: 'Calvin Williams',
	played: 'Guitar',
	for: 'Amnesty, Ultimate Force',
	date: '2013-03',
	},
	{
	name: 'Jason ("Stonewall") Seidler',
	played: 'Guitar',
	for: 'Why On Earth',
	link: 'https://www.youtube.com/watch?v=VtCYGDW2_VM',
	linkText: 'Memoriam on youtube',
	date: '2011-07-16',
	},
	{
	name: 'Bill Rice',
	played: 'Bass',
	for: 'Zerfas/Jubal',
	date: '2003-05-30',
	},
	{
	name: 'Russell Peck',
	played: 'An award winning ASCAP composer',
	for: 'russellpeck.com',
	date: '2009',
	},
	{
	name: 'Gary Lee Brewer',
	played: "Gary was our 1st call session drummer because of his versatility. He did much session work and pub gigs in the area, but wasn't affiliated with any specific band",
	date: '2017-07-27',
	reason: 'heart attack',
	age: 63,
	for: "He played on some of my stuff from the 'MO' album, and was the drummer on Ed Ott's LP",
	},
	{
	name: 'Tommy Wills',
	played: 'Band leader.',
	date: '2017-10-21',
	reason: 'fall',
	age: '93',
	for: 'Tommy Wills band',
	},
	{
	name: 'Red Massie',
	played: 'Bassist',
	date: '2017-11-12',
	age: '63',
	for: 'Amnesty, Rapture',
	},
	{
	name: 'Eugene Blakey',
	played: 'Songwriter, vocals, keyboard',
	date: '2007-12-25',
	for: 'Blakey Special',
	},
	{
	name: 'Steve Newbold',
	played: 'Guitarist, backup vocals',
	date: '2018-04-23',
	reason: 'heart attack',
	age: '63',
	for: 'Zerfas',
	},
	{
	name: 'Howard Phillips',
	played: 'Percussion',
	date: '2019-07-17',
	for: 'Jubal/Zerfas',
	},
	{
	name: 'Matthew Watson',
	played: 'drums',
	date: '2019-09-07',
	for: 'Ebony Rhythm Funk Campaign, Epoxy, 700 West session musician.',
	}
];

const Memoriam = (mem, key) => (
	<Item key={key}
		bold={mem.name}
		info={
			<>
			<div>Played: {mem.played}</div>
			<div>For: 
				{(mem?.forLink) ? <a href={`${mem?.forLink}`}>{mem.for}</a> : <>{mem.for}</>}
			</div>
			{mem?.link && <>Link: <a href={mem.link}>{mem?.linkText || 'Offsite Information'}</a></>}
			</>
		}
		date={mem.date}
		extra={<>
			{mem.age && <div>Age: {mem.age}</div>}
			{mem.reason && <div>Reason: {mem.reason}</div>}
		</>}
	/>
)

const App = (props) => (
	<Page link="memoriam" description="Memoriam">
		<p className="panelContainer">{data.map(Memoriam)}</p>
	</Page>
)

export default App;
