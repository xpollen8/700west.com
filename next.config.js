module.exports = {
  async redirects() {
		return [
			{
				source: '/audio/:path*',
				destination: `${process.env.NEXT_PUBLIC_AUDIO}/:path*`,
				permanent: false,
			},
			{
				source: '/videos/:path*',
				destination: `${process.env.NEXT_PUBLIC_VIDEOS}/:path*`,
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
				destination: 'http://tapes.700west.com',
				permanent: false,
			},
			{
				source: '/tapes/:path*',
				destination: 'http://tapes.700west.com/:path*',
				permanent: false,
			},
			{
				source: '/manifestor',
				destination: 'http://tapes.700west.com/manifestor',
				permanent: false,
			},
			{
				source: '/htdb/history.html',
				destination: '/',
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
