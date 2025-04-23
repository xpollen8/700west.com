module.exports = {
	images: {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'tapes.700west.com',
					port: '',
					pathname: '**',
				},
				{
					protocol: 'https',
					hostname: '700west.com',
					port: '',
					pathname: '**',
				},
			],
		},

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
				source: '/tapes',
				destination: 'https://tapes.700west.com',
				permanent: false,
			},
			{
				source: '/tapes/:path*',
				destination: 'https://tapes.700west.com/:path*',
				permanent: false,
			},
			{
				source: '/manifestor',
				destination: 'https://tapes.700west.com/manifestor',
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
			{
				source: '/moe',
				destination: '/mo',
				permanent: false,
			},
			{
				source: '/releases/:path*',
				destination: '/release/:path*',
				permanent: false,
			},
			{
				source: '/releases',
				destination: '/albums',
				permanent: false,
			},
		]
  }
}
