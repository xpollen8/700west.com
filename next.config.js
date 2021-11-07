module.exports = {
  async redirects() {
		return [
			{
				source: '/audio/:path*',
				destination: `${process.env.NEXT_PUBLIC_AUDIO}/:path*`,
				permanent: false,
			},
			{
				source: '/images/:path*',
				destination: `${process.env.NEXT_PUBLIC_IMAGES}/:path*`,
				permanent: false,
			},
			{
				source: '/feed',
				destination: 'http://old.700west.com/htdb/feed',
				permanent: false,
			},
			{
				source: '/tapes',
				destination: 'http://old.700west.com/tapes',
				permanent: false,
			},
			{
				source: '/htdb/releases/singles.html',
				destination: '/singles',
				permanent: false,
			},
			{
				source: '/:path*.html',
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
