import Grid from "@mui/material/Grid";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import getConfig from "next/config";
import { AboveFold } from "ui";
import type { GetServerSideProps } from "next";
import type { Forecast, ForecastResponse } from "shared-types";

import DetailsBox from "../components/DetailsBox";
import NoLocation from "../components/NoLocation";

const { publicRuntimeConfig } = getConfig();
const { OPEN_WEATHER_API, UNSPLASH_API } = publicRuntimeConfig;

type MainPage = {
  data?: ModifiedForecast;
  error?: boolean;
};

type Sun = {
  sunrise: Forecast["sys"]["sunrise"];
  sunset: Forecast["sys"]["sunset"];
};

export type Details = {
  pressure: Forecast["main"]["pressure"];
  humidity: Forecast["main"]["humidity"];
  visibility: Forecast["visibility"];
  wind: Forecast["wind"];
  clouds: Forecast["clouds"];
  sun: Sun;
};

type ModifiedForecast = {
  title: string;
  weatherIconUrl: string;
  currentTemp: number;
  weatherDescription: string;
  weatherTypeId: number;
  details: Details;
};

const MainPage = ({ data, error }: MainPage) => {
  if (error || !data) return <NoLocation />;

  const title = `${data.title} - Forecast`;

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={data.weatherIconUrl} />
        <title>{title}</title>
      </Head>
      <AboveFold bgimage={`${UNSPLASH_API}/${data.weatherTypeId}`}>
        <Typography variant="h1" component="h1" gutterBottom>
          {data.title}
        </Typography>
        <Grid container>
          <Grid item>
            <Typography variant="h2" component="h2">
              {data.currentTemp} &#8451;
            </Typography>
          </Grid>
        </Grid>
      </AboveFold>
      <DetailsBox data={data.details} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // const { lat = isLocal && -37.9517818, lon = isLocal && 145.008277 } =
  //   query || {};
  const { lat, lon } = query || {};

  // TODO: endpoint auth (this is server-side, so we can have API keys)
  const res = await fetch(`${OPEN_WEATHER_API}/?lat=${lat}&lon=${lon}`);
  const data: ForecastResponse = await res.json();

  if (!data.ok) {
    return { props: { error: true } };
  }

  const succ: ModifiedForecast = {
    title: `${data?.name}, ${data.sys.country}`,
    weatherIconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
    currentTemp: Math.round(data.main.temp),
    weatherDescription: data.weather[0].description,
    weatherTypeId: data.weather[0].id,
    details: {
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      visibility: data.visibility,
      wind: data.wind,
      clouds: data.clouds,
      sun: {
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      },
    },
  };

  return {
    props: { data: succ },
  };
};

export default MainPage;
