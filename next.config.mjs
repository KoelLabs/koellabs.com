import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };
    return config;
  },
};

export default nextConfig;
