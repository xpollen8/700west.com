import { Page } from './_app';
import { Item } from '../lib/helpers';
import memoriam from '../lib/memoriam';

const Memoriam = (mem, key) => (
	<Item key={key}
		bold={mem.name}
		info={
			<>
			<div>Played: {mem.played}</div>
			<div>For: 
				{(mem?.forLink) ? <a href={`${mem?.forLink}`}>{mem.for}</a> : <>{mem.for}</>}
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
		<p className="panelContainer">{memoriam.map(Memoriam)}</p>
	</Page>
)

export default App;
