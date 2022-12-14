type Coords = {
  lat: number;
  lon: number;
};

type Weather = {
  id: number;
  main?: string;
  description: string;
  icon: string;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Clouds = {
  all: number;
};

type Sys = {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type Forecast = {
  ok: true;
  coord?: Coords;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt?: number;
  sys: Sys;
  timezone?: number;
  id?: number;
  name: string;
  cod?: number;
};

export type ForecastError = {
  ok: false;
  error: string;
};

export type ForecastResponse = Forecast | ForecastError;
