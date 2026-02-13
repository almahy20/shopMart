import type { NextConfig } from "next";
// Invalid src prop (https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg) on `next/image`, hostname "ecommerce.routemisr.com" is not configured under images in your `next.config.js`
// See more info
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
      },
    ],
  },
  // reactCompiler: true,
};

export default nextConfig;
