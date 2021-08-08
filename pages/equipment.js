import Image from 'next/image';
import { Item } from '../lib/helpers';
import { Page } from './_app';

const data = [
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
				<a href={`/images/equipment/20150503_Console.jpg`}><Image src={`/images/equipment/20150503_Console_500.jpg`} width="500" height="334"/></a>
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
				<a href={`/images/equipment/20150505_SWT2ASA.jpg`}><Image src={`/images/equipment/20150505_SWT2ASA_500.jpg`} width="500" height="282" /></a>
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
					1934 Story & Clark studio upright piano; Wurlitzer electric piano
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

const Home = () => (
	<Page link="equipment" description="Equipment used at 700 West Recording">
		{data.map(({ heading, items }) => (
			<>
				<b>{heading}</b>
				<blockquote>
					{items.map((u, key) => (
						<Item key={key} className="row" extra={u} />
					))}
				</blockquote>
			</>
		))}
	</Page>
);

export default Home;
