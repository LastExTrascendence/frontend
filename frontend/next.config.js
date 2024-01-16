/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["cdn.intra.42.fr"],
    loader: 'default',
  },
  env: {
    BE_SERVER: process.env.BE_SERVER,
    FE_DOMAIN: process.env.FE_DOMAIN,
    IS_LOCAL: process.env.IS_LOCAL || true,
    FE_PORT: process.env.FE_PORT || 3333,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
