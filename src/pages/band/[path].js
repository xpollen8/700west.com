import { useRouter } from 'next/router'
import { setTitleFromURL } from '../../components/Page';
import Band from '../../components/Band';

export const metadata = setTitleFromURL('/bands');

const App = () => {
  const router = useRouter();
  const { path } = router.query;

	return <Band url={path} />
}

export default App;
