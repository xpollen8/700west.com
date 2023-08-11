import { writeFeedback } from '../../lib/feedback';

const feedback = async (req, res) => {
	const ret = await writeFeedback(req.body);

  res.statusCode = 200;
  res.json({ name: 'John Doe' })
}

export default feedback;
