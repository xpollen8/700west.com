import { SectionHeader, Page } from './_app';

const Photos = () => (
	<Page title="Photos" link="" description="Period Studio Photographs">
	<p>
	<a href={`${process.env.NEXT_PUBLIC_IMAGES}/studio_1976.jpg`}><img
		src={`${process.env.NEXT_PUBLIC_IMAGES}/studio_1976_500.jpg`}
		width="500" height="502" border="1" alt="the studio, 1976" /></a>
		<br/>
		The studio and control-room window - note the wall padding.
	</p>
	<p>
	<a href={`${process.env.NEXT_PUBLIC_IMAGES}/moeshot_1976.jpg`}><img
		src={`${process.env.NEXT_PUBLIC_IMAGES}/moeshot_1976_500.jpg`}
		width="500" height="427" border="1" alt="moe, 1976"/></a>
		<br/>
		Moe at the controls, the new 8-channel Tascam on his right (1976).
	</p>
	<p>
	<a href={`${process.env.NEXT_PUBLIC_IMAGES}/Moe_piano.jpg`}><img
		src={`${process.env.NEXT_PUBLIC_IMAGES}/Moe_piano_500.jpg`}
					width="500" height="393" border="1" alt="moe, 1976" /></a>
	</p>
	<p>
	<a href={`${process.env.NEXT_PUBLIC_IMAGES}/Mo_Dave.jpg`}><img
		src={`${process.env.NEXT_PUBLIC_IMAGES}/Mo_Dave_500.jpg`}
					width="500" height="335" border="1" alt="moe, 1976" /></a>
		<br/>
		Mo Whittemore, Dave Lovell. Also in-frame: Magnecord PT6-AH 2-track 1/4" recorder,
		and the 3M M23 4-track 1/2" recorder.  Pre-1976, 4-channel days.
	</p>
	<p>
	<a href={`${process.env.NEXT_PUBLIC_IMAGES}/Mo_machines.jpg`}><img
		src={`${process.env.NEXT_PUBLIC_IMAGES}/Mo_machines_500.jpg`}
					width="500" height="730" border="1" alt="moe, 1976" /></a>
	</p>
	<p>
	<a href={`${process.env.NEXT_PUBLIC_IMAGES}/MoetheHippie1972.jpg`}><img
		src={`${process.env.NEXT_PUBLIC_IMAGES}/MoetheHippie1972_500.jpg`}
					width="500" height="489" border="1" alt="moe, 1976" /></a>
		<br/>
		"Moe the hippie" AKA "disappointing his mother" (1972)
	</p>
	<p>
		<a href={`${process.env.NEXT_PUBLIC_IMAGES}/moe_1974.jpg`}><img
			src={`${process.env.NEXT_PUBLIC_IMAGES}/moe_1974_500.jpg`}
			width="500" height="840" border="1" alt="moe, 1974" /></a>
		<br/>
		Moe with homemade dulcimer, from local newspaper story.
		The 4-channel 3M M23 1/2&quot; recorder is over his shoulder (1974).
	</p>
		<p>
		<a href={`${process.env.NEXT_PUBLIC_IMAGES}/house.jpg`}><img
			src={`${process.env.NEXT_PUBLIC_IMAGES}/house_500.jpg`}
			width="500" height="332" border="1" alt="the studio, snow" /></a>
		<br/>
		The studio, up the lane.  Deep in winter, late 80's.
	</p>
	<p>
		<a href={`${process.env.NEXT_PUBLIC_IMAGES}/procdrumkit.jpg`}><img
			src={`${process.env.NEXT_PUBLIC_IMAGES}/procdrumkit_500.jpg`}
			width="500" height="313" border="1" alt="mark and drums" /></a>
		<br/>
		~1974.  A young Mark Whittemore helps set up the drums in the front room.
	</p>
	<p>
		<a href={`${process.env.NEXT_PUBLIC_IMAGES}/kev700west.jpg`}><img
			src={`${process.env.NEXT_PUBLIC_IMAGES}/kev700west_500.jpg`} width="500" height="742" /></a>
		<br/>
		Kevin Stonerock in the studio
	</p>
	</Page>
);

export default Photos;
