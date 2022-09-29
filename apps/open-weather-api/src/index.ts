/* eslint-disable import/no-anonymous-default-export */
import type { Forecast } from "shared-types";
import { defaultHeaders, genericError } from "workers-common";

export interface Env {
  OPEN_WEATHER_API_KEY: string;
}

const LATITUDE = "lat";
const LONGITUDE = "lon";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const parsedUrl = new URL(request.url);

    // check for required search params
    if (
      !parsedUrl.searchParams.has(LATITUDE) ||
      !parsedUrl.searchParams.has(LONGITUDE)
    ) {
      return new Response(
        JSON.stringify(
          { error: `${LATITUDE} or ${LONGITUDE} is missing`, ok: false },
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

    // TODO: move the API key into headers
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${env.OPEN_WEATHER_API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      const data: Forecast = await res.json();

      // open weather returns errors in 200
      // TODO: better error message, since OpenWeather DOES tell you what's wrong
      if (data.cod !== 200) {
        return genericError();
      }

      return new Response(JSON.stringify({ ...data, ok: true }, null, 2), {
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
