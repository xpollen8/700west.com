const MakeSource = (source) => {
	if (source) {
		return <span className="source">({source})</span>
	}
	return <></>
}

export default MakeSource;
