import { Metadata } from 'next'
import Page, { setTitleFromURL } from '../../components/Page';
import Musicians from '../../components/Musicians';

export const metadata: Metadata = setTitleFromURL('/musicians');

const App = () =>
	<Page link="/musicians">
		<Musicians />
	</Page>

export default App;
