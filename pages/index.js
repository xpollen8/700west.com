import { Page } from './_app';
import { SectionHeader } from '../lib/helpers';
import News from '../components/News';
import History from '../components/History';

const	ImageRotate = () => {
	switch (Math.floor(Math.random() * 4)) {
		case 1: return { src: `/images/250_business_card.jpg`, width: 250, height: 147, alt: "Business Card" }
		case 2: return { src: `/images/72adb.gif`, width: 379, height: 192, alt: "Newspaper Ad" }
		case 3: return { src: `/images/19730205_Primevil_Zerfas.jpg`, width: 250, height: 215, alt: "Big Day!" }
		default: return { src: `/images/newsad.jpg`, width: 367, height: 152, alt: "Newspaper Ad" }
	}
}

export async function getServerSideProps(context) {
  return {
    props: {
			rotating: ImageRotate()
		}, // will be passed to the page component as props
  }
}

const Home = ({ rotating }) => (
	<Page title="Welcome" link="" description="700 West Recording">
	<div className='hilite'>
		<News slug='RIP' />
		{/*<News slug='bandcampRelease' />*/}
	</div>
	<SectionHeader text="A short history of 700 West Recording by Mo Whittemore" />
	<History rotating={rotating} />
	</Page>
);

export default Home;
