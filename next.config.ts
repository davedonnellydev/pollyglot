// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-RateLimit-Limit",
            value: "20",
          },
          {
            key: "X-RateLimit-Window",
            value: "3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
