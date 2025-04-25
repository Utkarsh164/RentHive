/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
    serverActions: {
      bodySizeLimit: '5mb' // ⬅️ Added this line to increase the body size limit
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "giojpmaatzewemnniapp.supabase.co",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://roadsidecoder.created.app;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
