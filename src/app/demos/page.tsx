import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Demos from '../../components/Demos';

export const metadata: Metadata = setTitleFromURL('/demos');

const App = () =>
	<Page link="/demos">
		<Demos />
	</Page>

export default App;
