import { Page } from './_app';
import { fetchFeedback } from '../lib/feedback';
import { SectionHeader, Item } from '../lib/helpers';

export async function getServerSideProps(context) {
	const feedback = await fetchFeedback('htdb/index.html');
  return {
    props: {
			feedback
		},
  }
}

const Navigation = ({ feedback = [] }) => {
	return <></>
}

const CleanContact = (str) => str && str.replace(/\[remove\].*/, '@...');

const CleanDate = (date = new Date()) => {
	if (date) {
		const ret = new Date(date).toISOString().slice(0,10);
		const Difference_In_Time = new Date().getTime() - new Date(date).getTime();
		const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		const Difference_In_Years = Difference_In_Days / (365.25);

		const ago = ((Difference_In_Years > 1) ? `${Math.floor(Difference_In_Years)} yrs` : `${Math.ceil(Difference_In_Days)} days`) + ` ago`;
		return <span className="date">{ret}<span className="date ago">{ago}</span></span>
	}
}

const Comment = ({ subject, dtcreated, who, whence, comments }, key) => (
	<Item key={key} bold={subject} info={<> {whence} - {CleanContact(who)} </>}
		date={CleanDate(dtcreated)}
		body={comments}
	/>
)

const Comments = ({ feedback = [] }) => <>{feedback.map(Comment)}</>

const Feedback = ({ feedback }) => (
	<Page link="feedback" description="Comments left by 700west.com visitors">
		<Navigation feedback={feedback} />
		<Comments feedback={feedback} />
		<Navigation feedback={feedback} />
	</Page>
)

export default Feedback;