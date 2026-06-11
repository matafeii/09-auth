/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "ac.goit.global",
      },
    ],
  },
};

export default nextConfig;

