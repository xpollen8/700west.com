import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Listen from '../../components/Listen';

export const metadata: Metadata = setTitleFromURL('/listen');

const App = () =>
	<Page link="/listen">
		<Listen />
	</Page>

export default App;
