import Image from 'next/image';
import { SectionHeader, Page } from './_app';

const Home = () => (
	<Page link="equipment" description="Equipment used at 700 West Recording">
		<SectionHeader text="Homemade Stuff" />
			<blockquote><ul>
			<li>
			Bi-amped, 3-way studio monitors (Bozak lo, Eminence mids, CTS 
			hi) with 
			200/100watt 700west amps & electronic x'overs
			</li>
			<li>
			Modular analog synth w/digital key scan - more closely 
			resembled the Buchla, than the Moog (output frequency directly
			proportional to control voltage).  
			PAIA modules would i'fce with it quite well
			</li>
			<li>
			Ring modulator signal processor (quite effective 
			on B3 organ and electric oboe!)
			</li>
			<li>
			Instrument pitch-to-voltage converter (to i'face 
			instruments with the synth)
			</li>
			<li>
			Stereo 4-band compressor
			</li>
			<li>
			700west-redesigned Teletronics LA-3A 
			compressor/limiters (Vactrol control elements).
			</li>
			<li>
			3 stretched plate reverb units with 700west 30 watt driving
			systems (each plate had 4 active pickups on board).  The wooden 
			frames were a mistake, tho.  Seasonal humidity changes would
			require periodic re-alignment of the drivers!  Only harpsichords
			are worse!
			</li>
			<li>
			700west 4 X 4 'consolette', with hyper-quiet mic amps for distant-mic jobs
			</li>
			<a href={`/images/equipment/20150503_Console.jpg`}><Image src={`/images/equipment/20150503_Console_500.jpg`} width="500" height="334"/></a>
			</ul></blockquote>
		<SectionHeader text="Commercial Electronics" />
			<blockquote><ul>
			<li>
			Magnecord PT6-AH 2-track 1/4" recorder - 15IPS
			</li>
			<li>
			3M M23 4-track 1/2" recorder
			</li>
			<li>
			Tascam 70-8 8-track 1/2" recorder w/DBX noise reduction
			</li>
			<li>
			Tascam 25-2 1/4" 2-track submaster recorder
			</li>
			<li>
			Interface Electronics Stevenson 12 X 8 console
			</li>
			<li>
			Allison Labs compressor/limiters
			</li>
			<li>
			Kepex gate units
			</li>
			<li>
			Eventide Harmonizer/pitch shifter
			</li>
			<li>
			Octave-band graphic equalizers
			</li>
			<li>
			Delay lines: Southwest Tech Ambience Synthesizer 2AS-A
			</li>
			<a href={`/images/equipment/20150505_SWT2ASA.jpg`}><Image src={`/images/equipment/20150505_SWT2ASA_500.jpg`} width="500" height="282" /></a>
			</ul></blockquote>
		<SectionHeader text="Microphones" />
			<blockquote><ul>
			<li>
			Capacitor mics
			<blockquote><ul>
			<li>
			Neumann U-47 (1957 vintage) - (sold to Dave Meador)
			</li>
			<li>
			Sony C-37A - (sold to B.J. Rogers)
			</li>
			<li>
			700west C7 
			double-button cardioid condensers
			</li>
			<li>
			B&O stereo ribbon mic
			</li>
			<li>
			AKG C452 modular mics w/cardioid & 
			omni capsules
			</li>
			<li>
			E-V 1711 electret condenser mics
			</li>
			</ul></blockquote>
			</li>
			<li>
			Dynamic mics
			<blockquote><ul>
			<li>
			AKG D190E
			</li>
			<li>
			Sennheiser MD 421
			</li>
			<li>
			Shure SM70 omni
			</li>
			<li>E-V RE16
			</li>
			</ul></blockquote>
			</li>
			</ul></blockquote>
		<SectionHeader text="House Instruments" />
			<blockquote><ul>
			<li>
			1934 Story & Clark studio upright piano; Wurlitzer electric piano
			</li>
			<li>
			Korg K2 synth
			</li>
			<li>
			Elka string machine.
			</li>
			</ul></blockquote>
	</Page>
);

export default Home;
