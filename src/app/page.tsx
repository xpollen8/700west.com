import { Page } from './layout';
import SectionHeader from '../components/SectionHeader';
import News from '../components/News';
import History from '../components/History';

const Home = () => (
	<Page title="Welcome" link="" description="700 West Recording">
		<div className='hilite'>
			<News slug="RIP" />
		</div>
		<SectionHeader text="A short history of 700 West Recording by Mo Whittemore" />
		<History />
	</Page>
);

export default Home;
