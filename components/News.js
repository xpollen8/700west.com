import { SectionHeader } from '../pages/_app';
import { AudioPlayer } from '../lib/helpers.js';

const newsItems = [
	{
		slug: 'urgent',
		date: 'Sun Aug  1 22:03:27 PDT 2021',
		author: 'David Whittemore',
		title: 'Moe',
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
		author: 'David Whittemore',
		tags: [ 'event:interview', 'album:Best_of_700_West_Volume_II', 'person:Kyle_Long', 'person:Moe_Whittemore' ],
		date: '2019-04-26',
		title: 'WFYI interview of Moe Whittemore',
		linkExternal: 'https://www.wfyi.org/programs/cultural-manifesto/radio/Moe-Whittmore',
		linkExternalTitle: 'Listen here!',
		body: () =>
		<p>
		WFYI's Kyle Long's "Cultural Manifesto" returned to the old 700 West studio to interview Moe Whittemore.
		This hour-long program featured many tracks from the <a href="https://700west.bandcamp.com/album/best-of-700-west-volume-2" target="new"><b>Best of 700 West Vol. II</b></a>
		</p>
	},
	{
		author: 'David Whittemore',
		date: 'Sat Jun  6 07:04:05 PDT 2015',
		title: 'Nuvo Magazine',
		linkExternal: 'http://www.nuvo.net/MusicBlog/archives/2015/06/10/700-wests-moe-whittemore-gets-reissue',
		body: () =>
		<p>
		  700 West's Moe Whittemore gets reissue
		</p>
	},
	{
		author: 'David Whittemore',
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
		<blockquote>
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
		</blockquote>
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
		author: 'David Whittemore',
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

const FormatDate = (date) => {
	const dt = new Date(date).toISOString().slice(0,10);
	return <>{dt}</>
}

const NewsItem = ({ author, date, title = 'News Item!', body, tags = [], linkInternal, linkInternalTitle, linkExternal, linkExternalTitle = 'Original Article...', } = newsItems[0], key = 0) => (
		<li className={'news item ' + (key === 0 ? 'first' : '')} key={key}>
			<div className="news title">
				<SectionHeader text={title} />
			</div>
			<div className="news body">
				{body()}
			</div>
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
			<div className="news author">
				{author}
			</div>
			<span className="news date">
				{FormatDate(date)}
			</span>
			<div className="news tags">
				{tags.map(Tag)}
			</div>
	</li>
)

const News = ({ slug, num }) => {
	if (slug) {
		return <ul>{NewsItem(newsItems.find(i => i.slug === slug))}</ul>;
	} else if (num) {
		return <ul>{NewsItem(newsItems[num - 1])}</ul>
	} else {
		return (
			<ul>
			{newsItems.map(NewsItem)}
			</ul>
		)
	}
}

export default News;
