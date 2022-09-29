import { Typography } from "@mui/material";
import Head from "next/head";

const defaultWeatherIconUrl = "https://openweathermap.org/img/wn/04d@4x.png";

const NoLocation = () => (
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

export default NoLocation;
