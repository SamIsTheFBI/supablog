/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.donmai.us',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**'
      }
    ]
  },
};

export default nextConfig;
