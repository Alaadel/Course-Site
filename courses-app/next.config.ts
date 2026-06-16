import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://i.ibb.co/**')],
  },
};

export default nextConfig;
