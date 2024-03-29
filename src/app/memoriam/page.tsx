import { Metadata } from 'next'
import Page, { setTitleFromURL } from '../../components/Page';
import { makeMusicianLink, getBodyHTML } from '../../lib/helpers';
import memoriam from '../../lib/memoriam';
import { AKA } from '../../components/Musician';
import Item from '../../components/Item';

export const metadata: Metadata = setTitleFromURL('/memoriam');

const Memoriam = (mem: any, key: number) =>
	<Item key={key}
		bold={<a href={makeMusicianLink(mem.name)}>{mem.name}</a>}
		info={
			<>
			<AKA musician={mem.name} />
			<div>Role: {mem.played}</div>
			<div>For: {(mem?.forLink) ? <a href={`${mem?.forLink}`}>{mem.for}</a> : <>{mem.for}</>}
			</div>
			{mem?.link && <>Link: <a href={mem.link}>{mem?.linkText || 'Offsite Information'}</a></>}
			</>
		}
		date={parseInt(mem.date, 10) ? mem.date : ''}
		extra={<>
			{mem.age && <div>Age: {mem.age}</div>}
			{mem.reason && <div>Cause: {mem.reason}</div>}
		</>}
	/>

const App = () =>
	<Page link='/memoriam'>
		<div className="panelContainer">{memoriam.sort((a, b) => b?.date?.localeCompare(a?.date)).map(Memoriam)}</div>
	</Page>

export default App;
