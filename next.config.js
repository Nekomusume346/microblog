/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // ReactのStrictモードを有効化
  images: {
    domains: ['images.microcms-assets.io'],
  },
  // experimental: {
  //   appDir: true,
  // },

}
module.exports = nextConfig


