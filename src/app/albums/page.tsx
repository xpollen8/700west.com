import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Albums from '../../components/Albums';

export const metadata: Metadata = setTitleFromURL('/releases');

const App = () =>
	<Page title="Releases" link="albums" description="The Albums">
		<Albums />
	</Page>

export default App;
