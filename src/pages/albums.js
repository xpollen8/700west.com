import { Page } from './_app';
import Albums from '../components/Albums';

const App = (props) => {
	return <Page title="Releases" link="albums" description="The Albums">
		<Albums />
	</Page>
}

export default App;
