const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = withPlaiceholder({
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts/1', 
        permanent: true, 
      },
    ]
  },
  experimental: { images: { allowFutureImage: true } },
})
