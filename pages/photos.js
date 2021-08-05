import { SectionHeader, Page } from './_app';

const Photos = () => (
	<Page title="Photos" link="photos" description="Period Studio Photographs">
	<p>
	<a href={`/images/studio_1976.jpg`}><img
		src={`/images/studio_1976_500.jpg`}
		width="500" height="502" border="1" alt="the studio, 1976" /></a>
		<br/>
		The studio and control-room window - note the wall padding.
	</p>
	<p>
	<a href={`/images/moeshot_1976.jpg`}><img
		src={`/images/moeshot_1976_500.jpg`}
		width="500" height="427" border="1" alt="moe, 1976"/></a>
		<br/>
		Moe at the controls, the new 8-channel Tascam on his right (1976).
	</p>
	<p>
	<a href={`/images/Moe_piano.jpg`}><img
		src={`/images/Moe_piano_500.jpg`}
					width="500" height="393" border="1" alt="moe, 1976" /></a>
	</p>
	<p>
	<a href={`/images/Mo_Dave.jpg`}><img
		src={`/images/Mo_Dave_500.jpg`}
					width="500" height="335" border="1" alt="moe, 1976" /></a>
		<br/>
		Mo Whittemore, Dave Lovell. Also in-frame: Magnecord PT6-AH 2-track 1/4" recorder,
		and the 3M M23 4-track 1/2" recorder.  Pre-1976, 4-channel days.
	</p>
	<p>
	<a href={`/images/Mo_machines.jpg`}><img
		src={`/images/Mo_machines_500.jpg`}
					width="500" height="730" border="1" alt="moe, 1976" /></a>
	</p>
	<p>
	<a href={`/images/MoetheHippie1972.jpg`}><img
		src={`/images/MoetheHippie1972_500.jpg`}
					width="500" height="489" border="1" alt="moe, 1976" /></a>
		<br/>
		"Moe the hippie" AKA "disappointing his mother" (1972)
	</p>
	<p>
		<a href={`/images/moe_1974.jpg`}><img
			src={`/images/moe_1974_500.jpg`}
			width="500" height="840" border="1" alt="moe, 1974" /></a>
		<br/>
		Moe with homemade dulcimer, from local newspaper story.
		The 4-channel 3M M23 1/2&quot; recorder is over his shoulder (1974).
	</p>
		<p>
		<a href={`/images/house.jpg`}><img
			src={`/images/house_500.jpg`}
			width="500" height="332" border="1" alt="the studio, snow" /></a>
		<br/>
		The studio, up the lane.  Deep in winter, late 80's.
	</p>
	<p>
		<a href={`/images/procdrumkit.jpg`}><img
			src={`/images/procdrumkit_500.jpg`}
			width="500" height="313" border="1" alt="mark and drums" /></a>
		<br/>
		~1974.  A young Mark Whittemore helps set up the drums in the front room.
	</p>
	<p>
		<a href={`/images/kev700west.jpg`}><img
			src={`/images/kev700west_500.jpg`} width="500" height="742" /></a>
		<br/>
		Kevin Stonerock in the studio
	</p>
	</Page>
);

export default Photos;
