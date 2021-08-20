import Image from 'next/image';
import { Page } from './_app';
import { Item } from '../lib/helpers';

const data = [
	{
		src: `/images/studio_1976.jpg`,
		thumb: `/images/studio_1976_500.jpg`,
		width: 500,
		height: 502,
		date: `1976`,
		caption: `The studio and control-room window - note the wall padding.`,
	},
	{
		src: `/images/moeshot_1976.jpg`,
		thumb: `/images/moeshot_1976_500.jpg`,
		width: 500,
		height: 427,
		date: `1976`,
		caption: `Moe at the controls, the new 8-channel Tascam 70-8 on his right.`,
	},
	{
		src: `/images/Moe_piano.jpg`,
		thumb: `/images/Moe_piano_500.jpg`,
		width: 500,
		height: 393,
		date: `1976`,
		caption: `Moe at the treated piano`,
	},
	{
		src: `/images/Mo_Dave.jpg`,
		thumb: `/images/Mo_Dave_500.jpg`,
		width: 500,
		height: 335,
		date: `before 1976`,
		caption: `Moe Whittemore, Dave Lovell. Also in-frame: Magnecord PT6-AH 2-track 1/4" recorder,
		and the 3M M23 4-track 1/2" recorder.  4-channel days.`,
	},
	{
		src: `/images/Mo_machines.jpg`,
		thumb: `/images/Mo_machines_500.jpg`,
		width: 500,
		height: 730,
		date: `1976`,
		caption: `Captain America pants and the 3M M23 4-track`,
	},
	{
		src: `/images/MoetheHippie1972.jpg`,
		thumb: `/images/MoetheHippie1972_500.jpg`,
		width: 500,
		height: 489,
		date: `1972`,
		caption: `"Moe the hippie" AKA "disappointing his mother`,
	},
	{
		src: `/images/moe_1974.jpg`,
		thumb: `/images/moe_1974_500.jpg`,
		width: 500,
		height: 840,
		date: `1974`,
		caption: `Moe with homemade dulcimer, from local newspaper story.
		The 4-channel 3M M23 1/2" recorder is over his shoulder`,
	},
	{
		src: `/images/house.jpg`,
		thumb: `/images/house_500.jpg`,
		width: 500,
		height: 332,
		caption: `The studio, up the lane.  Deep in winter, late 80's`,
	},
	{
		src: `/images/procdrumkit.jpg`,
		thumb: `/images/procdrumkit_500.jpg`,
		width: 500,
		height: 313,
		date: `~1974`,
		caption: `A young Mark Whittemore helps set up the drums in the front room`,
	},
	{
		src: `/images/kev700west.jpg`,
		thumb: `/images/kev700west_500.jpg`,
		width: 500,
		height: 742,
		caption: `Kevin Stonerock in the studio`,
	},
];

const Photos = () => (
	<Page link="photos" description="Period Studio Photographs">
		<blockquote className="panelContainer">
			{data.map(({ src, thumb, width, height, alt, caption = '' }, key) => (
				<Item key={key} extra={<div style={{ textAlign: 'center' }} >
					<a href={src}><Image src={thumb} width={width} height={height} alt={alt || caption} /></a>
					<p>{caption}</p>
					</div>}
				/>
			))}
		</blockquote>
	</Page>
);

export default Photos;
