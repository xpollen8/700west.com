const Lyrics = (item) => {
	if (item.lyrics) {
		return (<blockquote><pre className="row lyrics"><div className="title">Lyrics</div>{item.lyrics.replace(/\t/g, '')}</pre></blockquote>)
	}
}

export default Lyrics;
