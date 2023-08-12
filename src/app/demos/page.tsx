import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Demos from '../../components/Demos';

export const metadata: Metadata = setTitleFromURL('/demos');

const App = () =>
	<Page title="Releases" link="/demos" description="The Demos">
		<Demos />
	</Page>

export default App;
