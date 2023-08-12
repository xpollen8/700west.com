import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Bands from '../../components/Bands';

export const metadata: Metadata = setTitleFromURL('/bands');

const App = () =>
	<Page title="Bands" link="/bands" description="The Bands">
		<Bands />
	</Page>

export default App;
