module.exports = {
  async redirects() {
		return [
			{
				source: '/htdb/releases/singles.html',
				destination: '/singles',
				permanent: false,
			},
			{
				source: '/htdb/:path*.html',
				destination: '/:path*',
				permanent: false,
			},
			{
				source: '/htdb/:uri*',
				destination: '/:uri*',
				permanent: false,
			},
		]
  }
}
