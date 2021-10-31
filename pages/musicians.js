import { Page } from './_app';
import Musicians from '../components/Musicians';

const App = (props) => {
	return <Page title="Musicians" link="musicians" description="The Musicians">
		<Musicians />
	</Page>
}

export default App;
