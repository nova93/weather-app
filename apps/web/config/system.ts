import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { isLocal } = publicRuntimeConfig;

export const API_URL = isLocal
  ? "http://0.0.0.0:8787"
  : "https://open-weather-api.nott-studios.workers.dev";
