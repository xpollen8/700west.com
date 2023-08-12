import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Musicians from '../../components/Musicians';

export const metadata: Metadata = setTitleFromURL('/musicians');

const App = () =>
	<Page title="Musicians" link="/musicians" description="The Musicians">
		<Musicians />
	</Page>

export default App;
