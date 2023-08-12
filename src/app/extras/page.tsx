import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Extras from '../../components/Extras';

export const metadata: Metadata = setTitleFromURL('/extras');

const App = () =>
	<Page title="Extras" link="extras" description="Reviews and Other Auxiliary Materials ">
		<Extras />
	</Page>

export default App;
