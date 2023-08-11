import { Page } from './_app';
import { makeMusicianLink, getBodyHTML } from '../lib/helpers';
import memoriam from '../lib/memoriam';
import Item from '../components/Item';

const Memoriam = (mem, key) => (
	<Item key={key}
		bold={<a href={makeMusicianLink(mem.name)}>{mem.name}</a>}
		info={
			<>
			<div>Played: {mem.played}</div>
			<div>For: {(mem?.forLink) ? <a href={`${mem?.forLink}`}>{mem.for}</a> : <>{mem.for}</>}
			</div>
			{mem?.link && <>Link: <a href={mem.link}>{mem?.linkText || 'Offsite Information'}</a></>}
			</>
		}
		date={mem.date}
		extra={<>
			{mem.age && <div>Age: {mem.age}</div>}
			{mem.reason && <div>Reason: {mem.reason}</div>}
		</>}
	/>
)

const App = (props) => (
	<Page link="memoriam" description="Memoriam">
		<div className="panelContainer">{memoriam.map(Memoriam)}</div>
	</Page>
)

export default App;
