import { Metadata } from 'next'

import Page, { setTitleFromURL } from '../components/Page';
import SectionHeader from '../components/SectionHeader';
import News from '../components/News';
import History from '../components/History';

export const metadata: Metadata = setTitleFromURL('/');

const Home = () => (
	<Page link="/">
		<div className='hilite'>
			<News slug="RIP" />
		</div>
		<SectionHeader text="A short history of 700 West Recording by Mo Whittemore" />
		<History />
	</Page>
)

export default Home;
