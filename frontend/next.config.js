/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["cdnb.artstation.com", "cdn.intra.42.fr"],
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
};

module.exports = nextConfig;
