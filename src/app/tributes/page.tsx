import { Page } from './_app';
import Tributes from '../components/Tributes';

const App = (props) => {
	return <Page link="tributes" description="Remembrances by recording artists">
		<Tributes />
	</Page>
}

export default App;
