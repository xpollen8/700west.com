import { AudioPlayer, Item } from '../lib/helpers.js';
import Image from 'next/image';

const newsItems = [
	{
	tags: [ 'event:interview', 'person:Kyle_Long', 'person:Moe_Whittemore' ],
	date: '2022-02-11',
	title: 'Echoes Of Indiana Avenue: Indiana Avenue at 700 West',
	linkExternal: 'https://www.wfyi.org/programs/echoes-indiana-avenue/radio/indiana-avenue-at-700-west',
	linkExternalTitle: 'Original Article',
	body: () =>
		<p>
		This week, we'll pay tribute to the late Moe Whittemore. During the 1970s, Moe ran the 700 West record label and recording studio from his family’s home in New Palestine, IN. Moe recorded some of the Avenue’s most respected funk and soul musicians at 700 West, including The Vanguards, Amnesty, Ebony Rhythm Funk Campaign, and the Words of Wisdom, a group founded by host Herman "Butch" Slaughter. 
		<li><AudioPlayer mp3='2022-02-11_ECHO_1074_4721.mp3'
			title={`Indiana Avenue at 700 West`} /></li>
		</p>
	},
	{
	tags: [ 'event:interview', 'person:Kyle_Long', 'person:Moe_Whittemore' ],
	date: '2022-01-27',
	title: 'Cultural Manifesto: Moe Whittemore and 700 West',
	linkExternal: 'https://www.wfyi.org/programs/cultural-manifesto/radio/moe-whittemore-and-700-west',
	linkExternalTitle: 'Original Article',
	body: () =>
		<p>
		This week we'll listen back to our 2015 interview with Moe Whittemore, who passed away recently. In the 1970s, Moe opened the 700 West studio and record label in the living room of his family’s home in New Palestine, Indiana. During the studio’s run, Moe recorded a diverse array of Indiana music - from early electronic sounds, bluegrass, funk, heavy metal, and psychedelic rock.
		<li><AudioPlayer mp3='2022-01-27_CMAN_238_4698.mp3'
			title={`Moe Whittemore and 700 West`} /></li>
		</p>
	},
	{
		slug: 'RIP',
	date: 'Thu Jan 20 09:46:48 PST 2022',
	title: 'Moe',
	linkExternal: 'https://www.stillingerfamilyfuneralhome.com/obituaries/Maurice-James-Whittemore-Jr?obId=23781211#/obituaryInfo',
	linkExternalTitle: 'Funeral home obituary',
	author: 'David Whittemore',
	body: () =>
		<p>
		Moe died with music and family present.
		<br/><br/>
		A brilliant man, dead from a contageous disease spread via malicious indifference.
		<br/><br/>
		We encourage you to <a href="/feedback">leave your thoughts</a>
		<br/><br/>
		<Image src="/images/cman-22-01-26.png" width={'750'} height={'420'} />
		<br/>
		Maurice James Whittemore, Jr.
		<br/>
		1934-09-30 - 2022-01-20
		</p>
	},
	{
	date: 'Sat Nov  6 17:41:19 PDT 2021',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: () =>
		<ul>
		<li> Fleshed out the : <a href="/bands">Bands</a> and <a href="/musicians">Musicians</a> sections </li>
		</ul>
	},
	{
	date: 'Sat Oct 30 21:15:47 PDT 2021',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: () =>
		<ul>
		<li> Added a new section: <a href="/bands">Bands</a> </li>
		<li> Added a new section: <a href="/musicians">Musicians</a> </li>
		</ul>
	},
	{
	date: 'Fri Oct 29 22:27:01 PDT 2021',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: () =>
		<ul>
		<li> Added a new section: <a href="/demos">Demos</a> with <b>Spectre</b> as its first inhabitant.</li>
		<li> Added audio for the to <a href="/releases/Sailor-Sailor.html">Sailor</a> release.</li>
		</ul>
	},
	{
		slug: 'manifesto2017',
		tags: [ 'event:interview', 'person:Kyle_Long', 'person:Moe_Whittemore' ],
		date: '2017-10-17',
		title: 'Cultural Manifesto: Interview of Moe Whittemore #1',
		linkExternal: 'https://www.wfyi.org/programs/cultural-manifesto/radio/Moe-Whittemore',
		linkExternalTitle: 'Original Article',
		body: () =>
		<>
		<p style={{ textAlign: 'center'}}>
		<Image src="/images/cman-17-10-11.jpg" width={'533'} height={'420'} />
		</p>
		<p>
		Kyle will speak with the mad scientist of Indiana music, Moe Whittemore, for an hour of words and music from 700 West. This episode features some rare soul and funk discs Moe recorded from bands like Little Murray and The Mantics, Funk St. Workshop, and more.
		</p>
		<p>
		<li><AudioPlayer mp3='20171017_Nuvo_Whittemore_Interview.mp3'
			title='Kyle Long interviews Moe Whittemore' /></li>
		</p>
		</>
	},
	{
		slug: 'urgent',
		date: 'Sun Aug  1 22:03:27 PDT 2021',
		author: 'David Whittemore',
		title: 'Give Moe a call!',
		linkInternal: '/contact',
		linkInternalTitle: 'Drop him a note',
		body: () =>
			<>
			<p>
				Friends, Musicians, Gentlefolk!
			</p>
			<p>
				My father would love to hear from you! Give him a call if you've got his number.
			</p>
			<p>
				Now's the time.
			</p>
		</>
	},
	{
		slug: 'bandcampRelease',
		title: 'The Best of 700 West Vol. II has been released!',
		linkExternal: 'https://700west.bandcamp.com',
		linkExternalTitle: 'Purchase both volumes from bandcamp',
		date: '2019-05-18',
		body: () => (
			<div style={{padding: "10px", width: '95%' }}>
				<iframe title="Store" style={{ border: 0, width: '100%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1474513005/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
				<iframe title="Store" style={{ border: 0, width: '100%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=762103402/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless />
			</div>
		)
	},
	{
		slug: 'manifesto',
		tags: [ 'event:interview', 'album:Best_of_700_West_Volume_II', 'person:Kyle_Long', 'person:Moe_Whittemore' ],
		date: '2019-04-26',
		title: 'Cultural Manifesto: Interview of Moe Whittemore #2',
		linkExternal: 'https://www.wfyi.org/programs/cultural-manifesto/radio/Moe-Whittmore',
		linkExternalTitle: 'Original Article',
		body: () =>
		<>
		<p style={{ textAlign: 'center'}}>
		<Image src="/images/WFYI_Interview_2019-04-25.jpg" width={'559'} height={'419'} />
		</p>
		<p>
		WFYI's Kyle Long's "Cultural Manifesto" returned to the old 700 West studio to interview Moe Whittemore.
		This hour-long program featured many tracks from the <a href="https://700west.bandcamp.com/album/best-of-700-west-volume-2" target="new"><b>Best of 700 West Vol. II</b></a>
		</p>
		<p>
		<li><AudioPlayer mp3='20190426_WFYI_Interview.mp3'
			title='Kyle Long interviews Moe Whittemore' /></li>
		</p>
		</>
	},
	{
		date: 'Sat Jun  6 07:04:05 PDT 2015',
		title: 'Nuvo Magazine',
		linkExternal: 'https://nuvo.newsnirvana.com/music/700-wests-moe-whittemore-gets-reissue/article_0cbd711d-e68c-52a9-91eb-d83ca16cdcbe.html',
		body: () =>
			<>
			<p style={{ textAlign: 'center'}}>
			<Image src="/images/20150606_Nuvo_Interview.jpg" width={'1763'} height={'1175'} />
			</p>
			<p>
				700 West's Moe Whittemore gets reissue
			</p>
			</>
	},
	{
		tags: [ 'event:release', 'album:MO', 'label:Anazitisi_Records' ],
		date: 'Sat Jun  6 07:04:05 PDT 2015',
		linkExternal: 'http://www.anazitisirecords.com/shop/phop/product_info.php?products_id=3769',
		linkExternalTitle: 'Order here',
		body: () =>
		<p>
			The extremely rare <b>Mo</b> album has ben re-released by <b>Anazitisi Records</b> with bonus track!
		</p>
	},
	{
	date: 'Fri May 23 21:44:59 PDT 2014',
	title: 'Site Updates',
	author: 'David Whittemore',
	body: () =>
		<ul>
		<li> Added track listing and updated audio to Amnesty's <a href="/releases/Amnesty-Free_Your_Mind.html">Free Your Mind</a></li>
		<li> Added images and audio excerpt to <a href="/releases/Lights_Of_Dawn-Ooo_Wee.html">Lights Of Dawn</a></li>
		<li> Updated <a href="/photos.html">Photos section</a></li>
		<li> Added <a href="/releases/Dan_Mobley-Walk_In_the_Wind_and_the_Rain.html">Dan Mobley track listing</a></li>
		<li> Uploaded audio for <AudioPlayer mp3='DanMobley_DenverDan/DanMobley_DenverDan_Colorado.mp3'
			band='Dan Mobley'
			title='Colorado' /></li>
		<li> Added <a href="/releases/Mo-First_Album?addendum=5">Moe Whittemore 2013 Interview</a></li>
		<li> Added <AudioPlayer mp3='2010_DanModlin_700West_Interview.mp3'
			title='Interview'
			time='12.51'
			comment='Dan Modlin interviews Moe Whittemore'
			date='2010' />
		</li>
		</ul>
	},
	{
		date: 'Sat Mar  3 07:55:46 PST 2012',
		author: 'Moe Whittemore',
		title: 'Email Message',
		linkInternal: '/releases/Mo-First_Album?addendum=6',
		linkInternalTitle: 'Local copy of the 2012 Nuvo article',
		body: () =>
			<>
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
			</>
	},
	{
		date: 'Sat Mar  3 08:22:25 PST 2012',
		author: 'Jay Wilfong',
		title: 'Email Message',
		body: () =>
			<>
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
			</>
	},
	{
		title: 'PM Magazine (1980) Artist Profile',
		date: '2012-10-10',
		body: () =>
			<>
				<p>
					700 West artist J Michael Henderson was profiled on "PM Magazine" Indianapolis with Tom Cochrun (1980)
				</p>
				<p>
					M.J. Whittemore Jr and the studio interior appears at 6:10 (yeah, that's a U47!)
				</p>
				<div className="video">
					<iframe title="TV interview" src="//www.youtube.com/embed/bNyjLmT3dn0" frameBorder="0" allowFullScreen />
				</div>
			</>
	},
];

const Tag = (tag, key) => (
	<div className="news tag" key={key}>{tag}</div>
)

const NewsItem = ({ author, date, title = 'News Item!', body, tags = [], linkInternal, linkInternalTitle, linkExternal, linkExternalTitle = 'Original Article...' } = newsItems[0], key = 0) => (
	<Item key={key} bold={title} author={author} date={date} body={<>
		{body()}
		{linkInternal &&
			<div className="news link">
				<a href={linkInternal}>{linkInternalTitle}</a>
			</div>
		}
		{linkExternal &&
			<div className="news link">
				<a href={linkExternal} target="new">{linkExternalTitle}</a>
			</div>
		}
		<div className="news tags">
			{tags.map(Tag)}
		</div>
		</>}
	/>
)

const News = ({ slug, num }) => {
	if (slug) {
		return NewsItem(newsItems.find(i => i.slug === slug))
	} else if (num) {
		return NewsItem(newsItems[num - 1])
	} else {
		return <div className="panelContainer">{newsItems.sort((a, b) => new Date(b.date) - new Date(a.date)).map(NewsItem)}</div>
	}
}

export default News;
