module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["restcountries.eu"],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    }

    return config;
  },
  experimental: {
    turboMode: true,
  },
};
