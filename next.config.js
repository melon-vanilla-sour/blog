const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = withPlaiceholder({
  images: {
    domains: ['images.ctfassets.net'],
  },
  experimental: { images: { allowFutureImage: true } },
})
