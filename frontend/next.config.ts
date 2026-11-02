import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export to `out/`, deployed to S3 behind CloudFront (see infra/).
  output: "export",
  // The default next/image optimizer needs a server, which a static export doesn't have.
  images: { unoptimized: true },
};

export default nextConfig;
