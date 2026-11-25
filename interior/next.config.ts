import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  images: {
    // Serve images as they are, without Vercel resizing. The free plan's
    // monthly image allowance (shared by all projects) ran out, and resized
    // images failed with 402. Images in /public are pre-compressed instead.
    unoptimized: true,
    // Next's default of 75 visibly softens interior photos; 90 keeps them crisp.
    qualities: [90],
    formats: ["image/avif", "image/webp"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
