const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = withPlaiceholder({
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/', // リダイレクト元のURL
        destination: '/posts/1', // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ]
  },
  experimental: { images: { allowFutureImage: true } },
})
