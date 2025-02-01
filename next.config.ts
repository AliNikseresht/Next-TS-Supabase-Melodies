import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverRuntimeConfig: {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
};

export default nextConfig;
