import { Metadata } from 'next'

import Page, { setTitleFromURL } from '../components/Page';
import SectionHeader from '../components/SectionHeader';
import News from '../components/News';
import History from '../components/History';

export const metadata: Metadata = setTitleFromURL('/');

const Home = () => (
	<Page link="/">
		<SectionHeader text="A short history of 700 West Recording" />
		<History />
		<SectionHeader text="Maurice James Whittemore, Jr." />
			<News slug="RIP" />
	</Page>
)

export default Home;
