/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "symphony-image-uploads.s3.ca-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
