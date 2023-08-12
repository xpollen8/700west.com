import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import News from '../../components/News';

export const metadata: Metadata = setTitleFromURL('/news');

const Home = () =>
	<Page link="/news">
		<News />
	</Page>

export default Home;
