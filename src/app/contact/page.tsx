import { Metadata } from 'next'
import { Page, setTitleFromURL } from '../layout';

export const metadata: Metadata = setTitleFromURL('/contact');

const App = () =>
	<Page title="Contact" link="contact" description="We'd love to hear from you!">
		<div className="panelContainer">
			<p className="row">
				If you have any material (audio, albums scans, press clippings) related to any of the bands associated with the 700 West Studio, we've got a home for it... right here!
			</p>
			<p className="row">
				Share memories about time spent at the studio. We'd love to hear from you. We are actively soliciting material - stories, scans, whatever!
			</p>
		</div>
		<div className="row">
			Get in touch at: contact[at]700west.com
		</div>
	</Page>

export default App;
