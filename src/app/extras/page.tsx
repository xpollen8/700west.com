import { Metadata } from 'next'
import Page, { setTitleFromURL } from '../../components/Page';
import Extras from '../../components/Extras';

export const metadata: Metadata = setTitleFromURL('/extras');

const App = () =>
	<Page link="/extras">
		<Extras />
	</Page>

export default App;
