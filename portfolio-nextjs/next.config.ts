import type { NextConfig } from "next";

const API_BASE = process.env.EXPRESS_API_URL || "http://localhost:5000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/projects/:path*",
        destination: `${API_BASE}/api/projects/:path*`,
      },
      {
        source: "/api/profile",
        destination: `${API_BASE}/api/profile`,
      },
    ];
  },
};

export default nextConfig;
