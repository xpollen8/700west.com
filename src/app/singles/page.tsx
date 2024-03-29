import { Metadata } from 'next'
import Page, { setTitleFromURL } from '../../components/Page';
import Singles from '../../components/Singles';

export const metadata: Metadata = setTitleFromURL('/singles');

const App = () =>
	<Page link="/singles">
		<Singles />
	</Page>

export default App;
