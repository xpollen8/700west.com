import { useRouter } from 'next/router'
import Band from '../../components/Band';

const App = () => {
  const router = useRouter();
  const { path } = router.query;

	return <Band url={path} />
}

export default App;
