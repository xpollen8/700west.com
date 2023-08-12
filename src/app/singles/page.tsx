import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Singles from '../../components/Singles';

export const metadata: Metadata = setTitleFromURL('/singles');

const App = () =>
	<Page title="Releases" link="singles" description="The Singles">
		<Singles />
	</Page>

export default App;
