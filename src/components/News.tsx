import Image from 'next/image';
import { autoLink, getBodyHTML } from '../lib/helpers.js';
import AudioPlayer from './AudioPlayer';
import Item from './Item';

type ItemType = {
	slug?: string
	extra?: string | React.ReactElement
	audio?: string
	author?: string
	date?: string
	title?: string
	body?: string
	tags?: string[]
	linkInternal?: string
	linkInternalTitle?: string
	linkExternal?: string
	linkExternalTitle?: string,
	info?: string
	lyrics?: string
}

const newsItems: ItemType[] = [
	{
	date: '2024-06-26',
	title: 'Site Updates',
	body: `
		<p>
		Added partial credits to <a href="/band/Charlie_Crosby">Charlie Crosby</a> band.
		</p>
		`
	},
	{
	date: '2024-02-19',
	title: 'Site Updates',
	body: `
		<p>
		Added demo audio for <a href="/release/Aaron_Band-Live_room_practice_session">Aaron Band</a>
		</p>
		`
	},
	{
	tags: [ 'event:interview', 'person:Kyle_Long', 'person:Mo_Whittemore' ],
	date: '2022-02-11',
	title: 'Echoes Of Indiana Avenue: Indiana Avenue at 700 West',
	linkExternal: 'https://www.wfyi.org/programs/echoes-indiana-avenue/radio/indiana-avenue-at-700-west',
	linkExternalTitle: 'Original Article',
	audio: `2022-02-11_ECHO_1074_4721.mp3`,
	body: `
		<p>
		This week, we'll pay tribute to the late Mo Whittemore. During the 1970s, Mo ran the 700 West record label and recording studio from his family’s home in New Palestine, IN. Mo recorded some of the Avenue’s most respected funk and soul musicians at 700 West, including The Vanguards, Amnesty, Ebony Rhythm Funk Campaign, and the Words of Wisdom, a group founded by host Herman "Butch" Slaughter. 
		</p>
		`
	},
	{
	tags: [ 'event:interview', 'person:Kyle_Long', 'person:Mo_Whittemore' ],
	date: '2022-01-27',
	title: 'Cultural Manifesto: Mo Whittemore and 700 West',
	linkExternal: 'https://www.wfyi.org/programs/cultural-manifesto/radio/moe-whittemore-and-700-west',
	linkExternalTitle: 'Original Article',
	audio: `2022-01-27_CMAN_238_4698.mp3`,
	body: `
		<p>
		This week we'll listen back to our 2015 interview with Mo Whittemore, who passed away recently. In the 1970s, Mo opened the 700 West studio and record label in the living room of his family’s home in New Palestine, Indiana. During the studio’s run, Mo recorded a diverse array of Indiana music - from early electronic sounds, bluegrass, funk, heavy metal, and psychedelic rock.
		</p>
		`
	},
	{
		slug: 'RIP',
	date: 'Thu Jan 20 09:46:48 PST 2022',
	title: 'Mo',
	linkExternal: 'https://www.stillingerfamilyfuneralhome.com/obituaries/Maurice-James-Whittemore-Jr?obId=23781211#/obituaryInfo',
	linkExternalTitle: 'Funeral home obituary',
	author: 'David Whittemore',
	body: `
		<p>
		Mo died with music and family present.
		</p>
		<p>
		A brilliant man, dead from a contageous disease spread via malicious indifference.
		</p>
		<p>
		We encourage you to <a href="/feedback">leave your thoughts</a>
		</p>
		<p>
		<Image className="image" src="/images/cman-22-01-26.png" width='100%' height='100%' />
		</p>
		<p>
		Maurice James Whittemore, Jr.
		</p>
		<p>
		1934-09-30 - 2022-01-20
		</p>
		`
	},
	{
	date: 'Sat Nov  6 17:41:19 PDT 2021',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: `
		<p>
		Fleshed out the : <a href="/bands">Bands</a> and <a href="/musicians">Musicians</a> sections
		</p>
		`
	},
	{
	date: 'Sat Oct 30 21:15:47 PDT 2021',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: `
		<ul>
		<li> Added a new section: <a href="/bands">Bands</a> </li>
		<li> Added a new section: <a href="/musicians">Musicians</a> </li>
		</ul>
		`
	},
	{
	date: 'Fri Oct 29 22:27:01 PDT 2021',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: `
		<ul>
		<li> Added a new section: <a href="/demos">Demos</a> with <b>Spectre</b> as its first inhabitant.</li>
		<li> Added audio for the to <a href="/release/Sailor-Sailor.html">Sailor</a> release.</li>
		</ul>
		`
	},
	{
		slug: 'manifesto2017',
		tags: [ 'event:interview', 'person:Kyle_Long', 'person:Mo_Whittemore' ],
		date: '2017-10-17',
		title: 'Cultural Manifesto: Interview of Mo Whittemore #1',
		linkExternal: 'https://www.wfyi.org/programs/cultural-manifesto/radio/Moe-Whittemore',
		linkExternalTitle: 'Original Article',
		audio: `20171017_Nuvo_Whittemore_Interview.mp3`,
		body: `
		<p style={{ textAlign: 'center'	}}>
		<Image className="image" src="/images/cman-17-10-11.jpg" width='100%' height='100%' />
		</p>
		<p>
		Kyle will speak with the mad scientist of Indiana music, Mo Whittemore, for an hour of words and music from 700 West. This episode features some rare soul and funk discs Mo recorded from bands like Little Murray and The Mantics, Funk St. Workshop, and more.
		</p>
		`
	},
	{
		slug: 'urgent',
		date: 'Sun Aug  1 22:03:27 PDT 2021',
		author: 'David Whittemore',
		title: 'Give Mo a call!',
		linkInternal: '/contact',
		linkInternalTitle: 'Drop him a note',
		body: `
			<p>
				Friends, Musicians, Gentlefolk!
			</p>
			<p>
				My father would love to hear from you! Give him a call if you've got his number.
			</p>
			<p>
				Now's the time.
			</p>
		`
	},
	{
		slug: 'bandcampRelease',
		title: 'The Best of 700 West Vol. II has been released!',
		linkExternal: 'https://700west.bandcamp.com',
		linkExternalTitle: 'Purchase both volumes from bandcamp',
		date: '2019-05-18',
		extra:
			<blockquote>
				<iframe title="Store" style={{ border: 0, width: '100%', height: '120px'	}} src="https://bandcamp.com/EmbeddedPlayer/album=1474513005/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
				<iframe title="Store" style={{ border: 0, width: '100%', height: '120px'	}} src="https://bandcamp.com/EmbeddedPlayer/album=762103402/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
			</blockquote>
	},
	{
		slug: 'manifesto',
		tags: [ 'event:interview', 'album:Best_of_700_West_Volume_II', 'person:Kyle_Long', 'person:Mo_Whittemore' ],
		date: '2019-04-26',
		title: 'Cultural Manifesto: Interview of Mo Whittemore #2',
		linkExternal: 'https://www.wfyi.org/programs/cultural-manifesto/radio/Moe-Whittmore',
		linkExternalTitle: 'Original Article',
		audio: `20190426_WFYI_Interview.mp3`,
		body: `
		<p style={{ textAlign: 'center'	}}>
		<Image className="image" src="/images/WFYI_Interview_2019-04-25.jpg" width='100%' height='100%' />
		</p>
		<p>
		WFYI's Kyle Long's "Cultural Manifesto" returned to the old 700 West studio to interview Mo Whittemore.
		This hour-long program featured many tracks from the Best Of 700 West - Volume II
		</p>
		`
	},
	{
		date: 'Sat Jun  6 07:04:05 PDT 2015',
		title: 'Nuvo Magazine',
		linkExternal: 'https://nuvo.newsnirvana.com/music/700-wests-moe-whittemore-gets-reissue/article_0cbd711d-e68c-52a9-91eb-d83ca16cdcbe.html',
		body: `
			<p style={{ textAlign: 'center'	}}>
			<Image className="image" src="/images/20150606_Nuvo_Interview.jpg" width='100%' height='100%' />
			</p>
			<p>
				700 West's Mo Whittemore gets reissue
			</p>
		`
	},
	{
		tags: [ 'event:release', 'album:MO', 'label:Anazitisi_Records' ],
		date: 'Sat Jun  6 07:04:05 PDT 2015',
		linkExternal: 'http://www.anazitisirecords.com/shop/phop/product_info.php?products_id=3769',
		linkExternalTitle: 'Order here',
		body: `
		<p>
			The extremely rare Mo album has ben re-released by <b>Anazitisi Records</b> with bonus track!
		</p>
		`
	},
	{
	date: 'Fri May 23 21:44:59 PDT 2014',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: `
		<ul>
		<li> Added track listing and updated audio to Amnesty's <a href="/release/Amnesty-Free_Your_Mind.html">Free Your Mind</a></li>
		<li> Added images and audio excerpt to <a href="/release/Lights_Of_Dawn-Ooo_Wee.html">Lights Of Dawn</a></li>
		<li> Updated <a href="/photos.html">Photos section</a></li>
		<li> Added <a href="/release/Dan_Mobley-Walk_In_the_Wind_and_the_Rain.html">Dan Mobley track listing</a></li>
		<li> Uploaded audio for <AudioPlayer mp3='DanMobley_DenverDan/DanMobley_DenverDan_Colorado.mp3' band='Dan Mobley' title='Colorado' /></li>
		<li> Added <a href="/release/Mo-First_Album?addendum=5">Mo Whittemore 2013 Interview</a></li>
		<li> Added <AudioPlayer mp3='2010_DanModlin_700West_Interview.mp3' title='Interview' time='12.51' comment='Dan Modlin interviews Mo Whittemore' date='2010' />
		</li>
		</ul>
		`
	},
	{
		date: 'Sat Mar  3 07:55:46 PST 2012',
		author: 'Mo Whittemore',
		title: 'Email Message',
		linkInternal: '/release/Mo-First_Album?addendum=6',
		linkInternalTitle: 'Local copy of the 2012 Nuvo article',
		body: `
				<p>
				Tho't u all'd get a kick out of my interview in the latest NUVO alternate rag.  It was supposed to show up in the print edition featuring "local
				labels", but they didn't have the room for it - hence the online link....  The original interview was done by Kyle Long at my place around '06.
				(The problem with the local labels feature in the print version is the groups/studio/labels only
				go back to about 1998.  By then, nothing much was left of the 'golden age' of the Indy music scene!)
				</p>
				<p>
				Anyway, just click around the link below to check out the article and its various musical downloads.  Deeper browsing within the article will reveal
				other NUVO reviews about 700 West that I didn't know existed!
				</p>
				<p>
				Take care!
				</p>
		`
	},
	{
		date: 'Sat Mar  3 08:22:25 PST 2012',
		author: 'Jay Wilfong',
		title: 'Email Message',
		body: `
				<p>
				Great article BUT justice could only be served by real time spent down that long gravel lane.
				</p>
				<p>
				Arrrrrrrrrrrrrrrrrrrrrrrrr and Avast ye swabs......
				Give 'em a broadside Bonney!!
				</p>
				<p>
				Ah how I love to think back to those days.... Moe's laughing demands to "get out of the chord dammit!"  The goats calling my name in the middle of the
				night.  Those "homemade" devices and sound effects some of which were suspiciously similar to f*rts.  Moe's shrieks of panic as Marshall amplifiers
				rolled down the stairwell.  Swords clanking, wine brewing, lectures on Hindu monks squatting in the Ganges.  Laughing, trudging, breaking down wooden
				platforms in the living room, dragged there on top of rusty Delta 88's.  Invitations from Bloomington studios to recording seminars and Moe's reply, "do
				you want me to attend it or teach it??!"  The smart ass remarks and comments honed to perfection and strangers asking "is he kidding or serious?" to
				which I would reply, "no, he is Moe".
				</p>
				<p>
				To many who passed by that little path running between two slightly larger little paths, it was no doubt just a dark and mysterious cut between a
				cornfield and a woods but to those of us who did time there it was so much more and forever changed our lives and hopefully they will release me soon.
				</p>
				<p>
				May there be a 700 West and a Moford in every filthy scoundrels life.
				</p>
		`
	},
	{
		title: 'PM Magazine (1980) Artist Profile',
		date: '2012-10-10',
		extra: <blockquote className="video"><iframe title="TV interview" src="//www.youtube.com/embed/bNyjLmT3dn0" frameBorder="0" allowFullScreen /></blockquote>,
		body: `
				<p>
					700 West artist J Michael Henderson was profiled on "PM Magazine" Indianapolis with Tom Cochrun (1980)
				</p>
				<p>
					M.J. Whittemore Jr and the studio interior appears at 6:10 (yeah, that's a U47!)
				</p>
		`
	},
];

const Tag = (tag: string, key: number) => (
	<div className="news tag" key={key}>{tag}</div>
)

const NewsItem = ({
	extra,
	audio,
	author,
	date,
	title,
	body,
	tags,
	linkInternal,
	linkInternalTitle,
	linkExternal,
	linkExternalTitle,
	info,
	lyrics,
}: ItemType, key?: number | undefined) => (
	<div key={key}>
	<Item bold={title || 'News Item!'} author={author} date={date} audio={audio} body={body} extra={extra}>
		<>
			{linkInternal &&
				<div className="news link">
					<a href={linkInternal}>{linkInternalTitle}</a>
				</div>
			}
			{linkExternal &&
				<div className="news link">
					<a href={linkExternal} target="new">{linkExternalTitle || 'Original Article...'}</a>
				</div>
			}
			<div className="news tags">
				{tags?.map(Tag)}
			</div>
		</>
	</Item>
	</div>
)

const News = ({ slug, num }: { slug?: string, num?: number }) => {
	if (slug) {
		return NewsItem(newsItems.find(i => i.slug === slug) || {})
	} else if (num) {
		return NewsItem(newsItems[num - 1] || {})
	} else {
		return <blockquote className="panelContainer">
			{newsItems.sort((a: any, b: any): any => (new Date(b.date)).getTime() - (new Date(a.date)).getTime()).map(NewsItem)}
		</blockquote>
	}
}

export default News;
