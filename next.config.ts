import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // the workspace root has its own lockfile; pin this app as the root
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
