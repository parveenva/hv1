/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  experimental: {

    appDir: true
    // Add the experimental features you want to enable here
    // For example:
    // concurrentFeatures: true,
    // someOtherFeature: true,
  },
};

module.exports = nextConfig;
