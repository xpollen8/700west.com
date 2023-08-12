import { Metadata } from 'next'
import Page, { setTitleFromURL } from '../../components/Page';
import Demos from '../../components/Demos';

export const metadata: Metadata = setTitleFromURL('/demos');

const App = () =>
	<Page link="/demos">
		<Demos />
	</Page>

export default App;
