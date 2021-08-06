import { SectionHeader, Page } from './_app';
import News from '../components/News';
import History from '../components/History';

const	ImageRotate = () => {
	if (Math.round(Math.random())) {
		return { src: `/images/250_business_card.jpg`, width: 250, height: 147, alt: "Business Card" }
	} else {
		return { src: `/images/72adb.gif`, width: 379, height: 192, alt: "Newspaper Ad" }
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
		<News slug='urgent' />
		<News slug='bandcampRelease' />
	</div>
	<SectionHeader text="A short history of 700 West Recording by Moe Whittemore" />
	<History rotating={rotating} />
	</Page>
);

export default Home;
