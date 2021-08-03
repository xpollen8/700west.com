const Bandcamp = () => (
	<div style={{ 'textAlign': 'center', 'padding': '10px', border:'1px solid', 'backgroundColor': 'white'}}>
		<p>
			<b>The <i>Best of 700 West Vol. II</i> has been released!</b>
		</p>
		<p>
			Purchase both volumes <a href="https://700west.bandcamp.com" target="new">from bandcamp</a>.
		</p>
		<p>
			<iframe style={{border: 0, width: '100%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1474513005/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://700west.bandcamp.com/album/best-of-700-west-volume-1">Best of 700 West Volume 1 by 700 West Recording</a></iframe>
			<iframe style={{border: 0, width: '100%', height: '120px'}} src="https://bandcamp.com/EmbeddedPlayer/album=762103402/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://700west.bandcamp.com/album/best-of-700-west-volume-2">Best of 700 West Volume 2 by 700 West Recording</a></iframe>
		</p>
		2019-05-18
	</div>
);

export default Bandcamp;
