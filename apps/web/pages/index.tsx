import Head from "next/head";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import type { Forecast } from "shared-types";
import { API_URL } from "../config/system";
import { GetServerSideProps } from "next";

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

const MainPage = ({ data, error }: MainPage) => {
  if (error || !data)
    return (
      <Typography variant="h1" component="h1">
        Please enable location services
      </Typography>
    );

  return (
    <div>
      <Head>
        <link rel="icon" type="image/x-icon" href={data.weatherIconUrl} />
        <title>{`${data.title} - Forecast`}</title>
      </Head>
      <Typography variant="h1" component="h1">
        {data.title}
      </Typography>

      <Grid container>
        <Grid item>
          <Typography variant="h2" component="h2">
            {data.currentTemp} &#8451;
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Image
            alt={data.weatherDescription}
            src={data.weatherIconUrl}
            width={100}
            height={100}
          />
        </Grid>
        <Grid item>
          <Typography variant="h2" component="h2">
            {data.weatherDescription}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { lat, lon } = query || {};
  const res = await fetch(`${API_URL}/?lat=${lat}&lon=${lon}`);
  const data: Forecast = await res.json();

  if (!data) {
    return { props: { error: true } };
  }

  const succ: Data = {
    title: `${data?.name}, ${data?.sys?.country}`,
    weatherIconUrl: `http://openweathermap.org/img/wn/${data.weather?.[0].icon}@4x.png`,
    currentTemp: 10,
    weatherDescription: "something",
  };

  return {
    props: { data: succ },
  };
};

export default MainPage;
