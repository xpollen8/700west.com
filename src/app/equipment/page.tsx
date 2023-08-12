import { Metadata } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { Page, setTitleFromURL } from '.././layout';
import Item from '../../components/Item';

export const metadata: Metadata = setTitleFromURL('/equipment');

type Items = React.ReactElement[];
type Data = {
	heading: string
	items: Items
}
	
const data: Data[] = [
	{
		heading: 'Homemade Stuff',
		items: [
			<>
				Bi-amped, 3-way studio monitors (Bozak lo, Eminence mids, CTS 
				hi) with 200/100watt 700west amps & electronic x'overs
			</>,
			<>
				Modular analog synth w/digital key scan - more closely 
				resembled the Buchla, than the Moog (output frequency directly
				proportional to control voltage).  
				PAIA modules would i'fce with it quite well
			</>,
			<>
				Ring modulator signal processor (quite effective 
				on B3 organ and electric oboe!)
			</>,
			<>
				Instrument pitch-to-voltage converter (to i'face 
				instruments with the synth)
			</>,
			<>
				Stereo 4-band compressor
			</>,
			<>
				700west-redesigned Teletronics LA-3A 
				compressor/limiters (Vactrol control elements).
			</>,
			<>
				3 stretched plate reverb units with 700west 30 watt driving
				systems (each plate had 4 active pickups on board).  The wooden 
				frames were a mistake, tho.  Seasonal humidity changes would
				require periodic re-alignment of the drivers!  Only harpsichords
				are worse!
			</>,
			<>
				<Link href={`/images/equipment/20150503_Console.jpg`}><Image className="image" src={`/images/equipment/20150503_Console_500.jpg`} width="500" height="334" alt="4 channel console" /></Link>
				<br/>
				700west 4 X 4 'consolette', with hyper-quiet mic amps for distant-mic jobs
			</>
		]
	},
	{
		heading: 'Commercial Electronics',
		items: [
			<>
				Magnecord PT6-AH 2-track 1/4" recorder - 15IPS
			</>,
			<>
				3M M23 4-track 1/2" recorder
			</>,
			<>
				Tascam 70-8 8-track 1/2" recorder w/DBX noise reduction
			</>,
			<>
				Tascam 25-2 1/4" 2-track submaster recorder
			</>,
			<>
				Interface Electronics Stevenson 12 X 8 console
			</>,
			<>
				Allison Labs compressor/limiters
			</>,
			<>
				Kepex gate units
			</>,
			<>
				Eventide Harmonizer/pitch shifter
			</>,
			<>
				Octave-band graphic equalizers
			</>,
			<>
				<Link href={`/images/equipment/20150505_SWT2ASA.jpg`}><Image className="image" src={`/images/equipment/20150505_SWT2ASA_500.jpg`} width="500" height="282" alt="SWT2ASA" /></Link>
				<br/>
				Delay lines: Southwest Tech Ambience Synthesizer 2AS-A
			</>
		]
	},
	{
		heading: 'Capacitor Microphones',
		items: [
				<>
					Neumann U-47 (1957 vintage) - (sold to Dave Meador)
				<Link href={`/images/equipment/u47.jpg`}><Image className="image" src={`/images/equipment/u47.jpg`} width="267" height="547" alt="Neumann U-47" /></Link>
				</>,
				<>
					Sony C-37A - (sold to B.J. Rogers)
				</>,
				<>
					700west C7 
					double-button cardioid condensers
				</>,
				<>
					B&O stereo ribbon mic
				</>,
				<>
					AKG C452 modular mics w/cardioid & 
					omni capsules
				</>,
				<>
					E-V 1711 electret condenser mics
				</>,
		]
	},
	{
		heading: 'Dynamic Microphones',
		items: [
				<>
					AKG D190E
				</>,
				<>
					Sennheiser MD 421
				</>,
				<>
					Shure SM70 omni
				</>,
				<>
					E-V RE16
				</>,
		]
	},
	{
		heading: 'House Instruments',
		items: [
				<>
					Wurlitzer electric piano
				</>,
				<>
					<p>
					1934 Story & Clark studio upright piano.
					</p>
					<p>
					The acoustic piano you hear on both of the Vol. I & II recordings is a Story & Clark - built in 1934, the year I was born.  Interestingly, we both were destined to cross paths later!
					</p>
					<p>
					Originally required for my piano class at school, it was purchased from Kenny Jagger, (a popular local TV keyboard celebrity back in the mid-50s).  The instrument was a studio upright, as I couldn't afford a grand.
					</p>
					<p>
					It later became our 700 West house piano, complete with a set of my piezo pickups which were most useful when a loud group decided to use a live acoustic piano on their rhythm beds.  Plus, its carefully lacquered hammers gave this instrument a very distinctive sound, quite suited to the recording process.  I quickly learned to keep it in good tune, occasionally detuning it to match groups' out-of-tune fixed pitch instruments.
					</p>
					<p>
					The next time I needed it (15 years following our studio closure), the instrument still was in perfect tune with itself and had only slipped from A=440 to A=438!  And this without the benefit of air conditioning!
					</p>
					<p>
					<b>One Great Box!!</b>
					</p>
					<p>
					Mo - 2018-02-24
					</p>
				</>,
				<>
					Korg K2 synth
				</>,
				<>
					Elka string machine.
				</>,
		]
	},
];

const Home = () =>
	<Page link="/equipment">
		{data.map(({ heading, items }, key) => (
			<>
				<b key={key}>{heading}</b>
				<blockquote className='panelContainer'>
					{items.map((u, key) => (
						<Item key={key} extra={u} />
					))}
				</blockquote>
			</>
		))}
	</Page>

export default Home;
