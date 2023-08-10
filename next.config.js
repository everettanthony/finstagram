/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverActions: true
    },
    images: {
      domains: ['github.com', 'lh3.googleusercontent.com', 'i.pravatar.cc']
    }
}
  
module.exports = nextConfig;
