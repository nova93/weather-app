import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { isLocal } = publicRuntimeConfig;

export const OPEN_WEATHER_API = isLocal
  ? "http://0.0.0.0:8787"
  : "https://open-weather-api.nott-studios.workers.dev";
export const UNSPlASH_API = isLocal
  ? "http://0.0.0.0:53559"
  : "https://unsplash-api.nott-studios.workers.dev";
