import { Metadata } from 'next'
import Page, { setTitleFromURL } from '../../components/Page';
import Listen from '../../components/Listen';

export const metadata: Metadata = setTitleFromURL('/listen');

const App = () =>
	<Page link="/listen">
		<Listen />
	</Page>

export default App;
