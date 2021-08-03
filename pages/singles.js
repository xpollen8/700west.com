import { Page } from './_app';
import Singles from '../components/Singles';

const App = (props) => {
	return <Page title="Releases" link="singles" description="The Singles">
		<Singles />
	</Page>
}

export default App;
