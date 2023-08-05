const	MakeSubject = ({ author, title, location, source, date, type, href, number }) => {
	
	const display = title ? [author, title].filter(x => x).join(' - ') : [author, source, location].filter(x => x).join(' - ');
	return display;
		//<a href={`${href}?addendum=${number + 1}`}>{display}</a>
		{/* BOMBS IN PRODUCTION date && displayDate(date) */}
}

export default MakeSubject;
