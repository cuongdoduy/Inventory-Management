/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'hvtu-bucket.s3.ap-southeast-2.amazonaws.com',
      'ui-avatars.com'
    ],
  },
}

module.exports = nextConfig
