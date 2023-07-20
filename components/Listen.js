import Image from 'next/image';
import releases from '../lib/releases';
import { SectionHeader, makeMusicianLink, makeReleaseLink, AudioPlayer } from '../lib/helpers';

const makeListenAlbum = ({ type, artist, title, tracks, multiArtist = false }, key) => (
	<div key={key}>
		{(type === 'reminiscence') ?
			(
				<span className="artist"><a href={makeMusicianLink(artist)}>{artist}</a> </span>
			)
			:
			(
				<span className="artist">{artist} - <a href={makeReleaseLink(artist, title)}>{title}</a> </span>
			)
		}
		<blockquote className="panelContainer">
			{tracks.filter(t => t.audio && t.audio.length > 0).map((data, key) => (
				<div key={key} className="row">
					<AudioPlayer {...data} band={(multiArtist) ? data.artist: ''} />
				</div>
			))}
		</blockquote>
	</div>
)

const makeListenSingle = ({ tracks, multiArtist = false }, key) => {
	const artist = tracks[0].artist;
	const title = tracks[0].title;
	return makeListenAlbum({ artist, title, tracks, multiArtist }, key);
}

const Listen = (props) => (
	<>
	<p>
		Here are some tracks for your personal enjoyment.
		You are expressly not authorized to re-distribute or to profit from these audio files.
	</p>

	<SectionHeader text="Interviews" />
		<span className="artist">Kyle Long's WFYI 'A Cultural Manifesto' radio interview<span className="date ago">2017</span></span>
		<blockquote className="row">
			<AudioPlayer mp3='20171017_Nuvo_Whittemore_Interview.mp3'
				title='Interview'
				time='59:10'
				/>
		</blockquote>

		<span className="artist">Dan Modlin interviews Mo Whittemore <span className="date ago">2010</span></span>
		<blockquote className="row">
			<AudioPlayer mp3='2010_DanModlin_700West_Interview.mp3'
				title='Interview'
				time='13:29'
				/>
		</blockquote>

	<SectionHeader text="L.P. Tracks" />
		<>
			{releases.filter(r => r.type === 'album' && r.tracks.find(t => (t.audio && t.audio.length))).sort((a, b) => a.artist.localeCompare(b.artist, undefined, { numeric: true })).map(makeListenAlbum)}
		</>

	<SectionHeader text='7" Tracks' />
		<>
			{releases.filter(r => r.type === 'single' && r.tracks.find(t => (t.audio && t.audio.length))).sort((a, b) => a.tracks[0].artist.localeCompare(b.tracks[0].artist, undefined, { numeric: true })).map(makeListenSingle)}
		</>

	<SectionHeader text='Demo Session Tracks' />
		<>
			{releases.filter(r => r.type === 'demo' && r?.tracks.find(t => (t.audio && t.audio.length))).sort((a, b) => a.artist.localeCompare(b.artist, undefined, { numeric: true })).map(makeListenAlbum)}
		</>

	<SectionHeader text="Special Material" />
		<>
			{releases.filter(r => r.type === 'reminiscence' && r?.tracks.find(t => (t.audio && t.audio.length))).sort((a, b) => a.artist.localeCompare(b.artist, undefined, { numeric: true })).map(makeListenAlbum)}
		</>

	<SectionHeader text="M. J. Whittemore, Jr.'s Classical Compositions" />
	<blockquote>
		In 2003, Mo Whittemore returned to graduate school at Butler University
		to complete the music degree he had started back in the 50's!
		Here are his MIDI representations of the classical composition class assigments
		- on which he received all A's
	</blockquote>
	<blockquote className="panelContainer">
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/MarchMadness.mp3' title='March Madness'
			date='April 2003' /></div>
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/InQuadrature.mp3' title='In Quadrature'
			date='July 2003' /></div>
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/2-PartInvention.mp3' title='2-Part Invention'
			date='November 2003' /></div>
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/3-VoiceFugue.mp3' title='3-Voice Fugue'
			date='December 2003' /></div>
	</blockquote>

	<div style={{ textAlign: 'center' }}>
		<Image src={`/images/Moconcert3.jpg`} width="288" height="432" />
	</div>
	<b>Wright Now!</b> (November 2003)
	<blockquote className="panelContainer">
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_01TheWinding.mp3' title='The Winding' /></div>
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_02_TheClimb.mp3' title='The Climb' /></div>
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_03_BumpingAbout.mp3' title='Bumping About' /></div>
		<div className="row"><AudioPlayer mp3='ButlerStudentVolumeOne/WrightNow_04_Descent.mp3' title='Descent' /></div>
	</blockquote>

	<b>More Compositions</b>
	<blockquote>
		<div className="row">
			<AudioPlayer mp3='ButlerStudentVolumeOne/Our4FeralKittens.mp3' title='Our 4 Feral Kittens'
				time="4:52"
				comment='Not really a classical composition...'
				date='December 2003' />
		</div>
	</blockquote>
	</>
)

export default Listen
