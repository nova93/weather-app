import type { Forecast } from "shared-types";

/* eslint-disable import/no-anonymous-default-export */
export interface Env {}

const defaultHeaders = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const LATITUDE = "lat";
const LONGITUDE = "lon";

const genericError = () => {
  return new Response(
    JSON.stringify({ error: "Something went wrong" }, null, 2),
    {
      status: 500,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        ...defaultHeaders,
      },
    }
  );
};

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const parsedUrl = new URL(request.url);

    // check for required query params
    if (
      !parsedUrl.searchParams.has(LATITUDE) ||
      !parsedUrl.searchParams.has(LONGITUDE)
    ) {
      return new Response(
        JSON.stringify(
          { error: `${LATITUDE} or ${LONGITUDE} is missing` },
          null,
          2
        ),
        {
          status: 400,
          headers: {
            "content-type": "application/json;charset=UTF-8",
            ...defaultHeaders,
          },
        }
      );
    }

    // get data from open weather
    const loc = {
      lat: parsedUrl.searchParams.get(LATITUDE),
      lon: parsedUrl.searchParams.get(LONGITUDE),
    };

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${env.OPEN_WEATHER_API_KEY}&units=metric`
      );
      const data: Forecast = await res.json();

      // open weather returns errors in 200
      // TODO: better error message, since OpenWeather does tell you what's wrong
      if (data.cod !== 200) {
        return genericError();
      }

      // TODO: there gotta be a better way...
      const cleanedData: Forecast = { ...data };
      delete cleanedData.coord;
      delete cleanedData.base;
      delete cleanedData.dt;
      delete cleanedData.timezone;
      delete cleanedData.id;
      delete cleanedData.cod;
      delete cleanedData.weather?.[0].id;
      delete cleanedData.weather?.[0].main;
      delete cleanedData.sys?.id;
      delete cleanedData.sys?.type;

      return new Response(JSON.stringify(cleanedData, null, 2), {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          ...defaultHeaders,
        },
      });
    } catch (error) {
      return genericError();
    }
  },
};
