import { Page } from './_app';
import Listen from '../components/Listen';

const App = (props) => {
	return <Page title="Listen" link="listen" description="Give a few tunes a spin">
		<Listen />
	</Page>
}

export default App;
