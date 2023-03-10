import { withPlaiceholder } from '@plaiceholder/next'

module.exports = withPlaiceholder({
  images: {
    domains: ['images.ctfassets.net'],
  },
  experimental: { images: { allowFutureImage: true } },
})
