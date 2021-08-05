import Image from 'next/image';
import releases from '../lib/releases';
import { SectionHeader } from '../pages/_app';
import { makeReleaseLink, AudioPlayer } from '../lib/helpers';

const makeListenAlbum = ({ artist, title, tracks }, key) => (
	<div key={key}>
		<span className="artist">{artist}</span>
		<span>
			- <a href={makeReleaseLink(artist, title)}>{title}</a>
		</span>
		<ul className="player">
		{tracks.filter(t => t.audio.length > 0).map(( data, key) => (
			<li key={key}>
			{AudioPlayer(data)}
			</li>
			))}
		</ul>
	</div>
)

const makeListenSingle = ({ tracks }) => {
	const artist = tracks[0].artist;
	const title = tracks[0].title;
	return makeListenAlbum({ artist, title, tracks });
}

const Listen = (props) => (
	<>
	<p>
		Here are some tracks for your personal enjoyment.
		You are expressly not authorized to re-distribute or to profit from these audio files.
	</p>

	<SectionHeader text="Interviews" />
		<AudioPlayer mp3='2010_DanModlin_700West_Interview.mp3'
			title='Interview'
			time='12.51'
			comment='Dan Modlin interviews Moe Whittemore' date='2010' />

	<SectionHeader text="L.P. Tracks" />
		<ul>
			{releases.filter(r => r.type === 'album' && r.tracks.find(t => t.audio.length)).map(makeListenAlbum)}
		</ul>

	<SectionHeader text='7" Tracks' />
		<ul>
			{releases.filter(r => r.type === 'single' && r.tracks.find(t => t.audio.length)).map(makeListenSingle)}
		</ul>

	<SectionHeader text="Unreleased Material" />
	<ol>
		<li><AudioPlayer mp3='Mo_WaitTilYesterday.mp3'
			band='LCD (Least Common Denominator)'
			title='Wait Til Yesterday' time='3:25'
			comment='Unreleased Mo demo' date='1977' />
		</li>
		<li><AudioPlayer mp3='UltimateForce/CircleCityFatback.mp3'
			band='Ultimate Force'
			title='Circle City Fatback'
			comment="Smokin' funk!, taken from submasters" />
		</li>
		<li><AudioPlayer mp3='Jeannie.mp3'
			band='Herman Walker'
			title='Jeannie' time='2:45'
			comment="The proper interpretation of one Jerome Winoker's unrequited love songs.
			Larry Lucas: Guitar, Herman Walker: Vocals, Bo Gooliak: Bass, Mel Cupp: Drums" />
		</li>
		<li><AudioPlayer mp3='FunkStWorkshop/Water.mp3'
			band='Funk St. Workshop'
			title='Water'
			comment='Taken from submasters' />
		</li>
		<li><AudioPlayer mp3='Jubal/CertainKindOfLady.mp3'
			band='Jubal (Zerfas)'
			title='A Certain Kind Of Lady'
			comment='Unreleased demo'
			date='1979' />
		</li>
		<li><AudioPlayer mp3='Jubal/ShakeUpYourMind.mp3'
			band='Jubal (Zerfas)'
			title='Shake Up Your Mind'
			comment='Unreleased demo, taken from submasters'
			date='1979' />
		</li>
	</ol>

	<SectionHeader text="M. J. Whittemore, Jr.'s Classical Compositions" />
	<p>
		In 2003, Moe Whittemore returned to graduate school at Butler University
		to complete the music degree he had started back in the 50's!
		Here are his MIDI representations of the classical composition class assigments
		- on which he received all A's
	</p>
	<ol>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/MarchMadness.mp3' title='March Madness'
			date='April 2003' /></li>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/InQuadrature.mp3' title='In Quadrature'
			date='July 2003' /></li>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/2-PartInvention.mp3' title='2-Part Invention'
			date='November 2003' /></li>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/3-VoiceFugue.mp3' title='3-Voice Fugue'
			date='December 2003' /></li>
	</ol>
	<p style={{ textAlign: 'center' }}>
		<Image src={`/images/Moconcert3.jpg`} width="288" height="432" />
		<br/>
		<b>Wright Now!</b> (November 2003)
	</p>
	<ol>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_01TheWinding.mp3' title='The Winding' /></li>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_02_TheClimb.mp3' title='The Climb' /></li>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_03_BumpingAbout.mp3' title='Bumping About' /></li>
		<li><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_04_Descent.mp3' title='Descent' /></li>
	</ol>
	<p>
	<AudioPlayer mp3='ButlerStudentVolumeOne/Our4FeralKittens.mp3' title='Our 4 Feral Kittens'
		time="4:52"
		comment='Not really a classical composition...'
		date='December 2003' />
	</p>
	</>
)

export default Listen
