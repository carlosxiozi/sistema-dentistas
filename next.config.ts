import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'jose/browser': 'jose',
};
    return config;
  }
};

export default nextConfig;
