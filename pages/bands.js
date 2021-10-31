import { Page } from './_app';
import Bands from '../components/Bands';

const App = (props) => {
	return <Page title="Bands" link="bands" description="The Bands">
		<Bands />
	</Page>
}

export default App;
