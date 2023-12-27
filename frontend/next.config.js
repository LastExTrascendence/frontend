/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["cdnb.artstation.com", "cdn.intra.42.fr"],
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    BE_SERVER: process.env.BE_SERVER,
    FE_DOMAIN: process.env.FE_DOMAIN,
    IS_LOCAL: process.env.IS_LOCAL || true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
