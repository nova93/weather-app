const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  publicRuntimeConfig: {
    isLocal: process.env.IS_LOCAL,
    OPEN_WEATHER_API: process.env.OPEN_WEATHER_API,
    UNSPlASH_API: process.env.UNSPlASH_API,
  },
});
