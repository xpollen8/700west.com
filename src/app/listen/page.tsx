import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Listen from '../../components/Listen';

export const metadata: Metadata = setTitleFromURL('/listen');

const App = () => {
	return <Page title="Listen" link="listen" description="Give a few tunes a spin">
		<Listen />
	</Page>
}

export default App;
