import { useRouter } from 'next/router'
import Release from '../../components/Release';

const App = () => {
  const router = useRouter();
  const { path, addendum } = router.query;

	return <Release url={path} addendum={addendum} />
}

export default App;
