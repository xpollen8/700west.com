import { SectionHeader, Page } from './_app';
import News from '../components/News';
import History from '../components/History';

const Home = () => (
	<Page title="Welcome" link="" description="700 West Recording">
	<div className='hilite'>
		<News slug='urgent' />
		<News slug='bandcampRelease' />
	</div>
	<SectionHeader text="A short history of 700 West Recording by Moe Whittemore" />
	<History />
	</Page>
);

export default Home;
