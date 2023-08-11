import { useRouter } from 'next/router'
import Musician from '../../components/Musician';

const App = () => {
  const router = useRouter();
  const { path } = router.query;

	return <Musician url={path} />
}

export default App;
