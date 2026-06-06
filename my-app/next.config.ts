/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // Allows Clerk profile images
      },
      {
        protocol: "https",
        hostname: "happy-corgi-123.convex.cloud", // Replace with YOUR actual Convex URL!
      }
    ],
  },
};

export default nextConfig;