import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';
import Tributes from '../../components/Tributes';

export const metadata: Metadata = setTitleFromURL('/tributes');

const App = () => 
<Page link="/tributes" description="Remembrances by recording artists">
	<Tributes />
</Page>

export default App;
