module.exports = {
  images: {
    domains: ['melon-sour-blog-images.s3.amazonaws.com'],
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
}
