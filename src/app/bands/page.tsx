import { Metadata } from 'next'
import Page, { setTitleFromURL } from '../../components/Page';
import Bands from '../../components/Bands';

export const metadata: Metadata = setTitleFromURL('/bands');

const App = () =>
	<Page link="/bands">
		<Bands />
	</Page>

export default App;
