import { Page } from './_app';
import Demos from '../components/Demos';

const App = (props) => {
	return <Page title="Releases" link="demos" description="The Demos">
		<Demos />
	</Page>
}

export default App;
