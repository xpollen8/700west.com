const formatDate = (date = new Date()) => new Date(date).toISOString().slice(0,10);

export const MakeDateAgo = (date) => {
	const ret = formatDate(date);
	const Difference_In_Time = new Date().getTime() - new Date(date).getTime();
	const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	const Difference_In_Years = Difference_In_Days / (365.25);

	if (Math.floor(Difference_In_Days) > 0) {
		const ago = ((Difference_In_Years > 1) ? `${Math.floor(Difference_In_Years)} yrs` : `${Math.floor(Difference_In_Days)} days`) + ` ago`;
		return ago;
	}
	return '';
}

const MakeDate = (date) => {
	if (date) {
		try {
			const ret = formatDate(date);
			const ago = MakeDateAgo(date);
			if (ago) {
				return <span className="date">{ret}<span className="date ago">{ago}</span></span>
			} else {
				return <span className="date ago">{ret}</span>
			}
		} catch {
			return <span className="date">{date}</span>;
		}
	}
}

export default MakeDate;
