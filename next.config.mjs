import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  compiler: {
    // Enable React compiler for better performance
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };

    config.optimization.minimizer = [
      config.optimization.minimizer[0],
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              colormin: { hsl: false }, // see https://github.com/cssnano/cssnano/issues/1515
            },
          ],
        },
      }),
    ];

    return config;
  },
};

export default nextConfig;
