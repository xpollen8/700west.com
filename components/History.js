import Image from 'next/image';

const History = ({ rotating }) => {
	const { src, width, height, alt } = rotating;
	return <>
	<p>
	700 West Recording was a place that catered to the musician.  Plenty of area studios 
	back in '72 were doing the commercial thing.  That's where the money was.  But there was 
	a big vacuum in affordable locations for bands to cut a quality demo.  This was to be our 
	niche.
	</p>
	<p>
	 <div style={{ display: 'inline-block', float: 'right' }} >
		<Image src={src} width={width} height={height} border="0" alt={alt} />
		{/*
		<Image src={`/images/250_business_card.jpg`} width="250" height="147" border="0" alt="Business Card" />
		<Image src={`/images/72adb.gif`} width="379" height="192" border="0" alt="Newspaper Ad" />
		*/}
	</div>
	The demo tape was our specialty, although many albums & singles were generated during 
	our 12 years of existence.- just check the "Albums/Singles" section of the site!  And with my 
	electronics background, I wound up doing my share of instrument and amp repair - many 
	times before sessions. I also did a bit of custom electronics fabrication for our clients.  
	It also seemed that the groups were constantly needing lead sheets of their original tunes for 
	copyright purposes.  We handled that, too, even writing the occasional resume and letter of 
	recommendation for our friends!  Many nights our clients shared the dinner table with my 
	family.  If the weather was bad, they slept over.  To clear their heads between cuts, they 
	messed with our horses, goats and chickens.  We were a mini "full service" operation!
	</p>
	<p>
	700 West was privileged to record a high ratio of original material - very few of our groups 
	did many 'cover' tunes.  (Thank god!  Three hearings of "Smoke On The Water" was 
	plenty!)  This exposure to so much excellent original material led to our becoming an 
	ASCAP music publisher, enrolling many of the best area writers into the association.  Many 
	received airplay royalty checks for their efforts!  And we constantly attempted to hook up 
	the best material with major publishers by keeping countless demo tapes in circulation.
	</p>
	<div style={{ display: 'inline-block', float: 'left', padding: '10px' }}>
		<a href={`/images/20161007_700WestTapes.jpg`}><Image src={`/images/20161007_700WestTapes_500.jpg`} width="500" height="670" alt="The Master Tapes" /></a>
	</div>
	<p>
	We did all types of material at 700 West: funk; hard rock; country rock; gospel (all styles!), 
	some jazz (jazz groups didn't record often); bluegrass (the most difficult gig for me to do 
	properly, as it's generally a one-take live recording session with a room full of performers); 
	a bit of  country (area country artists tended to record in N'ville): ethnic; and even a classical 
	demo or two. Among our best efforts was a 16-piece big band gig.  But the only way I 
	would tackle it was to overdub by section.  There was no way to fit the whole group into our 
	small recording area!  
	</p>
	<p>
	In our later years we did dabble in commercials, mostly speculative stuff done by some of 
	our best bands venturing into this field.  Surprisingly, a couple of these efforts for an area 
	cab company and shoe store aired for more than a decade - long after we closed up shop.
	</p>
	<p>
	And the spec commercial for Auto-Owners Insurance went national and is still running on TV!
	("...the No Problem People...")
	I hope Dave Lovell is being compensated for his efforts on this one! 
	</p>
	<p>
	Did we record anybody famous?  Maybe.  The Wright Brothers did some work with us  (I 
	even installed one of my acoustic guitar pickups in one of their axes.)  Russell Peck is now 
	an established classical composer, although his demo cut at our place was parody stuff.  
	David Bowie's wife dropped in to watch Russ' group record.  We worked with national 
	artists the Vanguards and Ebony Rhythm Funk Campaign.  Gospel writer/performer Aaron 
	Wilburn did a little work here.  Babyface sang backup on a few funky party/dance cuts.  
	Members of the Faith and Roadmaster bands (regional heroes) did session work with us.  
	Many that passed through our portals are still earning a good living as studio musicians.  
	While we were in business, 700 West was proud to be labeled the 'most aired' studio in the 
	region.  It figures.  On recent listening, the stuff still sounds good!
	</p>
	<p>
	In 1983 it all came to an end.  The recession caught up with the music business.  I guess I 
	could see it coming.  The large horn bands of the early and mid '70s became quartets, then 
	trios.  Even single acts were becoming popular.   The area clubs, with their diminishing 
	clientele, couldn't afford to pay the large bands anymore.  With too few bands needing club 
	demos, 700 West closed up shop in December '83.  But our last band's video made it on to 
	MTV!
	</p>
	<p>
	We must've done some things right.  Anything recorded on the 700 West label apparently 
	has an underground following.  LPs in sealed condition now command upwards of $1000, 
	depending on the group recorded!  A 1st reissue of the Zerfas album has already happened, 
	with a 2nd in the works.  A legitimate reissue of the Primevil album will happen soon (it was 
	pirated back in '86, I heard).  Kevin Stonerock is now re-releasing his "Day Before 
	Tomorrow" on CD.  Hang in, there!  There's more to come from 700 West!
	</p>
	</>
}

export default History;
