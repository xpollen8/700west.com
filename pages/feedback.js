import { useState } from 'react';
import { Page } from './_app';
import { fetchFeedback } from '../lib/feedback';
import MakeDate from '../components/MakeDate';
import SectionHeader from '../components/SectionHeader';
import Item from '../components/Item';

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

const Comment = ({ subject, dtcreated, who, whence, comments }, key) => (
	<Item key={key} bold={subject} info={<> {whence} - {CleanContact(who)} </>}
		date={MakeDate(dtcreated)}
		body={comments}
	/>
)

const Comments = ({ feedback = [] }) => <>{feedback.map(Comment)}</>

const AddComment = () => {
	const [ feedback, setFeedback ] = useState({ subject: '', who: '', whence: '', comments: '' });
	const [ result, setResult ] = useState();
	const [ required, setRequired ] = useState();
	if (result) {
		return <p>Comments received</p>
	} else {
		return (
		<form onSubmit={async (e) => {
			e.preventDefault();
			if (!(feedback?.subject?.length &&
				feedback?.who?.length &&
				feedback?.whence?.length &&
				feedback?.comments?.length)) {
				setRequired(true);
				return;
			}
			const res = await fetch('/api/feedback', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(feedback),
			});
			setResult(res);

		}}>
		{required && <p>All fields required</p>}
		<table width="100%">
		<tbody>
		<tr>
		<td>Subject:</td><td><input size="40" type="text" name="subject" defaultValue={feedback.subject} onChange={(e) => setFeedback({...feedback, subject: e.target.value})}/></td>
		</tr>
		<tr>
		<td>Who:</td><td><input size="40" type="text" name="who" defaultValue={feedback.who}  onChange={(e) => setFeedback({...feedback, who: e.target.value})}/></td>
		</tr>
		<tr>
		<td>Where:</td><td><input size="40" type="text" name="whence" defaultValue={feedback.whence}  onChange={(e) => setFeedback({...feedback, whence: e.target.value})}/></td>
		</tr>
		<tr>
		<td>Comment:</td><td><textarea cols="40" name="comments"  defaultValue={feedback.comments} onChange={(e) => setFeedback({...feedback, comments: e.target.value})}/></td>
		</tr>
		<tr>
		<td><button type="submit">Leave Feedback</button></td>
		</tr>
		</tbody>
		</table>
		</form>
		);
	}
}

const Feedback = ({ feedback }) => (
	<Page link="feedback" description="Comments left by 700west.com visitors">
		<Navigation feedback={feedback} />
		<AddComment />
		<Comments feedback={feedback} />
		<Navigation feedback={feedback} />
	</Page>
)

export default Feedback;
