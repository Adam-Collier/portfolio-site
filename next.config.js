module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['i.scdn.co', 'a.ltrbxd.com', 'www.notion.so', 'mosaic.scdn.co'],
  },
};
