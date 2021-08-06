module.exports = {
  async redirects() {
		return [
			{
				source: '/audio/:path*',
				destination: `${process.env.NEXT_PUBLIC_AUDIO}/:path*`,
				permanent: false,
			},
			/* USE IF IMAGES ARE EVER SERVED NON_LOCALLY
			{
				source: '/images/:path*',
				destination: `${process.env.NEXT_PUBLIC_IMAGES}/:path*`,
				permanent: false,
			},
			*/
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
