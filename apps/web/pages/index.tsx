import Head from "next/head";
import getConfig from "next/config";
import { Grid, Typography } from "@mui/material";
import { OPEN_WEATHER_API, UNSPlASH_API } from "../config/system";
import { GetServerSideProps } from "next";
import type { ForecastResponse } from "shared-types";
import { AboveFold } from "ui";

const { publicRuntimeConfig } = getConfig();
const { isLocal } = publicRuntimeConfig;

type MainPage = {
  data?: Data;
  error?: boolean;
};

type Data = {
  title: string;
  weatherIconUrl: string;
  currentTemp: number;
  weatherDescription: string;
};

const defaultWeatherIconUrl = "https://openweathermap.org/img/wn/04d@4x.png";

const MainPage = ({ data, error }: MainPage) => {
  if (error || !data)
    return (
      <>
        <Head>
          <title>Lack of location - Forecast</title>
          <link rel="icon" type="image/x-icon" href={defaultWeatherIconUrl} />
        </Head>
        <Typography variant="h1" component="h1">
          Please enable location services
        </Typography>
      </>
    );

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={data.weatherIconUrl} />
        <title>{`${data.title} - Forecast`}</title>
      </Head>
      <AboveFold
        bgimage={`${UNSPlASH_API}/?query=${encodeURIComponent(
          data.weatherDescription
        )}`}
      >
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { lat = isLocal && -37.9517818, lon = isLocal && 145.008277 } =
    query || {};
  const res = await fetch(`${OPEN_WEATHER_API}/?lat=${lat}&lon=${lon}`);
  const data: ForecastResponse = await res.json();

  if (!data.ok) {
    return { props: { error: true } };
  }

  const succ: Data = {
    title: `${data?.name}, ${data.sys.country}`,
    weatherIconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
    currentTemp: Math.round(data.main.temp),
    weatherDescription: data.weather[0].description,
  };

  return {
    props: { data: succ },
  };
};

export default MainPage;
