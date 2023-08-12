import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import { makeMusicianLink, getBodyHTML } from '../../lib/helpers';
import memoriam from '../../lib/memoriam';
import Item from '../../components/Item';

export const metadata: Metadata = setTitleFromURL('/memoriam');

const Memoriam = (mem: any, key: number) =>
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

const App = () =>
	<Page link='/memoriam'>
		<div className="panelContainer">{memoriam.map(Memoriam)}</div>
	</Page>

export default App;
