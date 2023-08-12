import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Albums from '../../components/Albums';

export const metadata: Metadata = setTitleFromURL('/albums');

const App = () =>
	<Page link="/albums">
		<Albums />
	</Page>

export default App;
