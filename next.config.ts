import withPWA from "next-pwa";
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "jose/browser": "jose",
    };
    return config;
  },
};
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);

