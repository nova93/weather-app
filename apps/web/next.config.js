const withTM = require("next-transpile-modules")([
  "ui",
  "@mui/material",
  "@mui/system",
  "@mui/icons-material",
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    isLocal: process.env.IS_LOCAL,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
});
