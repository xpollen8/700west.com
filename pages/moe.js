import Image from 'next/image';
import { SectionHeader } from '../lib/helpers';
import { Page } from './_app';

const App = (props) => {
	return <Page title="Mo" link="moe" description="The Resume of Maurice J. Whittemore, Jr., 700 West Engineer">
		<center>
		<table border="0" cellPadding="5" cellSpacing="0">
		<tr>
		<td>
		<Image src={`/images/mo.gif`} border="3" width="170" height="233" />
		</td>
		<td valign="middle">
		<b> Maurice J. ('Mo') Whittemore. Jr.</b>
		<p>
		<a href={`/images/business_card.jpg`}><Image
		        src={`/images/250_business_card.jpg`} width="250" height="147" border="0" hspace="3" vspace="3" /></a>
		</p>
		(Recent contact info available
		<a href="mailto:moe@700west.com">upon request</a>)
		<p>
			<a href="/releases/Mo-First_Album?addendum=5">Mo Whittemore 2013 Interview</a>)
		</p>
		</td>
		</tr>
		</table>
		</center>
		<SectionHeader text="In Brief" />
		<p>
		My forte' is electronic hardware and circuit design, both digital and analog. My most recent electronic experience has been systems integration of CNC machine tools and the troubleshooting/repair of microprocessor-based portable medical electronics' tools.
		</p>
		<p>
		In addition, I'm quite familiar with the specification and application of most active and passive sensor types, including acoustic devices.  I possess strong written communication skills, and as a result I report my work quite well.
		</p>
		<p>
		I've absorbed a bit of programming knowledge: I'm reasonably conversant in Assembler (8 and 16-bit embedded applications); Basic (various test sequencing, data acquisition and number crunching tasks) and involved in AI/Expert System applications.  I also hold patents in the fields of acoustics and electro-optics.
		</p>
		<p>
			I'm a published composer-author in the field of music, recently earning my master's degree in Music Composition.  My "Project CD" (an anthology of music recorded during my `studio years') represents the best of the Indianapolis music scene during the years from 1970-83 - and the effort received critical acclaim.  Currently an active composer, I keep my material in constant circulation to prospective publishers.
		</p>
		<p>
		However, my most recent career efforts are centered on contributions to our area music community as a player, student mentor - and a member of various boards of directors.
		</p>
		<p>
		I'm an excellent problem solver and self-starter - and one who gets along quite well with his fellow worker.  For what it's worth, my recent past part-time retail sales experience has made me very aware of the 'needs of the customer'.
		</p>
		<SectionHeader text="Major Career Accomplishments" />
		<p>
		<b>Phillips Music Guild of Indianapolis
		(2006-present)</b><br/>
		I'm an Oboe & English Horn mentor to students participating in PMG's small ensemble and symphonic band programs.  I'm also required to present technical, music related topics to these students.  In addition, I'm currently serving on the PMG board of directors.
		</p>
		<p>
		<b>Young Audiences of Indiana
		(2006-07)</b><br/>
		Worked as a composer, `sound designer' and `electronic/MIDI musician' with Y.A.I.  We brought our popular show into area schools to expose students to theatre/multimedia possibilities.
		</p>
		<p>
		<b>Butler Univ.
		(2003-05)</b><br/>
		I returned to school in 2003, and earned my Master's degree in Music Composition, graduating in 2005.
		</p>
		<p>
		<b>Polymer Technology Systems Inc.
		(2001-03)</b><br/>
		PTS is a leading biotech company that manufactures hand-held, microprocessor-based, blood-properties measurement devices.  My assignment was to quickly learn the principles of operation of these instruments, then diagnose the failure modes of a large group of production "rejects".  In addition, I was expected to repair/reclaim as many of these devices as possible.  I've developed trouble-trees & flow charts for this project to steer a group of assistants through the diagnostic mazes.  The project required both digital and analog circuit savvy.  (My past optics background also proved to be valuable to PTS on this project.)  The profit on the sale of these `reclaimed' units more than financed my stay at PTS.
		</p>
		<p>
		<b>Hurco Mfg, Inc.
		(1994 - 2001;
		2005-2006)</b><br/>
		As a systems integrator, I'd been instrumental in taking Hurco's recent CNC machine tool products from concept to production.  I'm especially proud of the fact that my styling and packaging of the "Ultipath" controller was pivotal in its acceptance by the world market!
		</p>
		<p>
		In the interest of achieving the `most bang for the buck' in our machine tool products, I've evaluated, setup, tuned/optimized, then specified axis and spindle servomotors and their electronic drive packages spanning the 1/2hp to 20hp power range.  (I'm equally at home with d.c. brush & brushless, as well as a.c. servomotor systems.)
		</p>
		<p>
		I'd made an impact with this company-in-transition, by breaking down barriers between engineering, service and manufacturing personnel.  The improved communications, coupled with my problem solving ability have eased production problem `logjams'.  As a result, the flow of Hurco's new line of CNC machine tools are now adding to company profits!
		</p>
		<p>
		<b>700 West
		(1992 - present)</b><br/>
		I've recently used my background in CNC machine tool system integration to design CE Category III safety upgrades as a consultant to Humston Machinery, Inc.  These electrical modifications are applied to Hurco VMX30 machining centers recently purchased by J&J/DePuy, Inc.
		</p>
		<p>
		<b>Allison Transmission
		Div, GMC.
		(1984-92)</b><br/>
		Designed, manufactured and marketed a miniature tracking radio to aid modelers in finding lost model aircraft.  The system employs SMD technology.  The product enjoyed expanding sales, and became profitable.
		</p>
		<p>
		I've had a relationship with Whirlpool Corp. as an acoustics consultant on `future technology' product development.
		</p>
		<p>
		Developed the World Transmission simulator (a digital/analog hybrid system used to evaluate, exercise and develop the control software for ATD's 68HC11xx-based closed loop PWM controller).  Realistic, in-vehicle sequences were obtained from a linked PC programmed in Basic.
		</p>
		<p>
		Improved the circuit design and made ready for production ATD's 68HC11 WT transmission controller.
		</p>
		<p>
		Helped bring a new awareness for co-operation between electronic and mechanical design groups in a traditionally `mechanical operation'; created a portable Knowledge Base of sensors used in present (and future) ATD x'mission systems.  It employs an interactive, Windows-oriented Expert System to disseminate info about available electronic devices to mechanical designers.
		</p>
		<p>
		Developed a method to predict deterioration of inacessible, internal rotating transmission components using the system's existing sensors - including the development of its mathematical model.  I then laid the groundwork for a WT test tool employing the principle.  It used a 68HC11F1 micro as its heart.
		</p>
		<p>
		Developed a micro-based (68x05xx) portable wiring harness/x'mission component checker, including the writing of the assembly language code.  An early version was used to check internal electrical connections by ATD production personnel; the latest version is currently used as a field service tool.
		</p>
		<p>
		I developed low cost sensors utilizing the emerging FSR (force sensitive resistor) technology.  I used factorial test techniques to improve the breed for use in harsh environments.
		</p>
		<p>
		<b>Belcan/Detroit
		Diesel-Allison, Div. GMC.
		(1983-84)</b><br/>
		Helped develop and maintain an automatic, multivariable test scheme to rapidly evaluate fuel management system sensors.  Many different sensor types by competing suppliers were quickly evaluated, using an AT-based data acquisition system.  This early application of automatic testing and reporting at DDA more than paid for itself in saved manpower.
		</p>
		<p>
		<b>700 West
		Recording
		(1972-83)</b><br/>
		I am a published ASCAP composer/author.
		</p>
		<p>
		Developed & fabricated analog and digital pitch shifting devices for production use in my studio.  The studio synthesizer was my own design (a digital and analog hybrid) that was used on numerous local and regional commercials and records.
		</p>
		<p>
		25 years later, records cut on my label have a collectible value between $500 to $2000 per copy!  Many of these records have been re-released by 3rd party record companies and are now available again as CDs or song-by-song digital downloads
		</p>
		<p>
		I have taught recording techniques courses, given lectures on the music business and have also spoken on this topic as a guest on various radio talk shows.
		</p>
		<p>
		My studio was regarded as the place to go for the maximum product for minimum cost, fair treatment and an education!  I'm especially proud of the fact that in the period of my self-employment, I've worked closely with nearly 2000 individuals from 3 to 300 hours each, and never had any of my clients bad-mouth me!
		</p>
		<p>
		<b>RCA Corp.
		(1967-72)</b><br/>
		Developed an opto/electronic stereo audio system for their <a href="http://www.google.com/patents/US3688025" target="new">SelectaVision product</a>.  The recording and playback was accomplished using lasers and a hi-resolution photosensitive medium.  The project resulted in a patent granted.
		</p>
		<p>
		Developed a hi-frequency piezoelectric disc cutting system that was the forerunner of the production SV cutters.
		</p>
		<p>
		Developed an automatic record flaw (`tic & pop') detection system for production quality control.  It would electronically recognize spurious noise buried within the much greater music & speech signals.
		</p>
		<p>
		Co-developed a hi-power studio monitor loudspeaker system for use in all RCA recording facilities.  The result was so well received (over such diverse tastes from classical to rock music), that a well know group refused to record unless these monitors were present!
		Developed ultra-low noise amplifiers (0.2microvolts NRI \@ 20khz bandwidth) for critical studio console use.
		</p>
		<p>
		<b>Delco Electronics
		Div, GMC.
		(1960-67)</b><br/>
		Designed, then followed through production an auto radio audio circuit that was so cost effective it remained in production for over 12 years, was copied by most of the competition and became an industry standard.
		</p>
		<p>
		Designed a subminiature horn loudspeaker for a helmet radio that was instrumental in winning a large military contract for Delco.  This project resulted in <a href="http://www.google.com/patents/US3249873" target="new">a patent granted</a>.
		</p>
		<p>
		<b>Allison Div, GMC.
		(1956-60)</b><br/>
		Designed an electronic test kit that started equipment styling trends that continued long after I left the company.
		</p>
		<SectionHeader text="Hobbies and Other Interests" />
		<p>
		Since 1982, I've been employed part time at a local hobby shop - just because I find it an interesting diversion from my work in the sciences.  (The employee discounts are great, too!)
		I'm also active in the design and competition flying of model aircraft, including assuming contest director duties at national and local events.
		</p>
		<p>
		I'm editor/publisher of a nationally recognized model aircraft newsletter, and occasionally contribute material to commercial model publications.  I've tried to spread the "model gospel" to kids with teaching and building sessions at various schools and at Indy's Children's Museum.
		</p>
		<p>
		I also enjoy woodworking and music (my PC is equipped for composition, and I have home studio equipment).  I've always designed and built my own home (and studio) sound systems, with the current offering being a high power, tri-amplified system.
		</p>
		<p>
		Other extracurricular activities include, V.P., then president of two model plane clubs; VP of high school band boosters; Woodwind instructor at h.s. band camp; Member of high school math textbook selection committee; president of muzzle-loading gun club and V.P. of local auto club.
		</p>
		<SectionHeader text="General Information" />
		<p>
		Born Sept. 1, 1934; Married, 4 children.<br/>
		B.S. in Electrical Engineering (Purdue Univ, 1956).<br/>
		90 credit hours toward A.B. in Music (Butler Univ, 1958-60).<br/>
		Master of Music in Composition (Butler Univ, 2003-05).
		</p>
		<p>
		Continuing education training in: FMEA and SPC and Project Management techniques; C Programming; Software Engineering; AI and Expert System Design; Knowledge Acquisition; Neural Network and Fuzzy Logic fundamentals, and CNC machine tool parts programming.
		</p>
		<SectionHeader text="Professional Development/Job History" />
		<p>
		Upon graduation from Purdue in 1956, I was employed by Allison Div. GMC, in Indianapolis.  My responsibilities included electronic circuit design as applied to instrumentation of turbojet and turboprop aircraft engines; the design and troubleshooting of the temperature control servo amplifiers for these engines; the design and development of the electronic prop synchronizing servo system for cabin noise reduction in the Lockheed Electra aircraft.  I was also involved in the development of DC-to-DC inverter/supplies of the 50 to 500 watt power class.
		</p>
		<p>
		1960 through 1967 found me with Delco Electronics Div. GMC (Kokomo, IN).  My responsibilities included the design and development of specialized loudspeaker and microphone test equipment, which involved both analog and digital circuitry; the development of low distortion solid state audio amplifiers; low noise, low distortion audio preamplifiers; the design, development and production follow-through of high volume production auto radio audio systems (including tape players and reverberation devices).  I was also involved in the design, development and production follow-through of both commercial grade and high quality moving coil speakers and cones (latter item requiring a knowledge of paper technology), and the design and development of horn, electrostatic and piezoelectric loudspeakers and electrostatic microphones.
		</p>
		<p>
		From 1967 to 1972 I was employed by RCA Record Engineering Labs (Indianapolis).  I was responsible for the development of the opto/electronic (laser record/playback) audio concept used in the holographic option of <a href="http://www.google.com/patents/US3688025" target="new">SelectaVision</a>.  I was also responsible for the original development of the hi-frequency piezoelectric disc cutting system used in SelectaVision production.
		Additional duties included the development of an automatic record fault detection system; the design, development and production of studio monitor loudspeaker systems; the development of low noise preamplifiers for disc and tape playback reference systems.  I have spent considerable time in the evaluation and modification of: studio microphones and monitor speaker systems; multi-channel studio tape recorders and high speed tape duplication systems; studio console electronics; audio compressor/limiters; equalizers and artificial reverberation systems.
		</p>
		<p>
		From 1972 to 1983 I was self-employed as Owner-Operator of 700 West Recording Studios, and 700 West Music - an ASCAP music publishing service.  My duties included the composition, arrangement, production, performance and recording of music - primarily group recording.  Secondary duties included the promotion and distribution of records on my label, plus the operation of a music publishing service.
		To enhance my production capabilities at 700 West, I designed and fabricated various analog and digital signal processing systems, namely time delay and pitch shifting devices, plus I constantly upgraded my electronic music synthesizer.  All development work and equipment maintenance was done in my own lab.  I was also involved in the teaching of recording technique courses and lecturing on the business of music.  I had frequently spoken on this topic as a guest on various radio talk shows.
		</p>
		<p>
		During 1983-84, I was employed by Belcan Associates, at Detroit Diesel Allison Div., GMC (Indianapolis).  My responsibilities included instrumentation, then performing multivariable tests on oil and manifold pressure sensors, temperature sensors and position sensors: and - most importantly, the documentation and dissemination of the test results.  I was also responsible for the programming of the data acquisition computer which ran the tests.
		</p>
		<p>
		From 1984 until my Jun'92 GM retirement, I was employed by Allison Transmission Div, GMC.  My responsibilities have included; design and maintenance of test fixtures/simulators for the WT Transmission Controller, to allow for its hardware and software development (the project involved analog and digital design techniques, as well as circuit board layout and fabrication.  A linked-data acquisition computer was programmed to `exercise' the controller with realistic, field application sequences; Optimization of the circuitry in the 68HC11 based WT controller, including its switching power supply regulator, as it progressed from prototype to production; design and development of a 68705 based wiring harness checker for the WT, including assembly code programming; assistance on the design of the WT serial-link diagnostic data reader; development of a mathematical method to measure eccentricity of x'mission internal rotating parts, using existing sensors; conversion of the method into a 68HC11F1 based measuring tool; establishment of an expert system/knowledge base for all sensors used in ATD's present and near-future electronic x'missions - then evaluate all devices logged into this knowledge base (phew!); develop to maturity, low cost pressure sensors using the new Force Sensitive Resistor technology; Generate projects for, and (most importantly!) act as mentor/tutor to student engineers.
		</p>
		<p>
		Since my early retirement from GM, I have designed, developed and successfully marketed a miniature RF tracking transmitter to aid modelers in locating their downed/lost model aircraft.  I've also been employed as an Acoustics consultant by a major corporation.
		My R&D effort on an ongoing, privately-funded electronic musical instrument project has utilized my skills with PC-based MIDI software sequencers, MIDI sound synthesizer modules, audio hardware, switching regulator design, sensor development, microcontroller integration (including disk drive), and music composition expertise to demonstrate this portable, battery-operated system.
		</p>
		<p>
		I've been a full-time contract employee of Hurco Mfg, Inc. as a Systems Integrator/Senior Project Engineer working with CNC machine tools - a job requiring the knowledge of servomotors and their electronic drive systems, a bit of PLC ladder logic programming, and the underlying machine control code for Pentium-based controllers and their electronic hardware interfaces.  The Hurco position also required considerable diplomatic skills!
		I was also recenty employed by Polymer Technology Systems, Inc. as an Engineer troubleshooting (and repairing) their recent biomedical product - a handheld, microprocessor-based, blood properties measurement device.
		Following my employment with the above, I returned to Butler University in 2003, receiving my master's degree in Music Composition in 2005.
		</p>
		<b>Rev.	5/29/11</b>
	</Page>
}

export default App;
