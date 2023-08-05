const MakeAuthor = (author, authorContact) => {
	const makeContact = (authorContact) => {
		if (authorContact) {
			const ret = authorContact.match(/@/) ? `mailto:${authorContact}` : authorContact;
			return <span className="contact">
				<a href={ret} target="new">{authorContact}</a>
			</span>;
		}
	}
	if (authorContact) {
		return <>
			{author} {makeContact(authorContact)}
		</>
	} else {
		return author;
	}
}

export default MakeAuthor;
