/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
// Set to your repo name for GitHub Pages project sites (e.g. /sah-khush-card).
// Leave empty ("") if using a custom domain or a user/org GitHub Pages site.
const GH_PAGES_BASE = "";

const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages / any static host
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  trailingSlash: true,
  basePath: isProd && GH_PAGES_BASE ? GH_PAGES_BASE : "",
  assetPrefix: isProd && GH_PAGES_BASE ? GH_PAGES_BASE + "/" : "",
};

export default nextConfig;
