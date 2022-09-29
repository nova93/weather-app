import { defaultHeaders, genericError } from "workers-common";

import { UNSPLASH_URL } from "./config/urls";
import imageMapper from "./imageMapper";

/* eslint-disable import/no-anonymous-default-export */
export interface Env {
  UNSPLASH_CLIENT_ID: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const parsedUrl = new URL(request.url);

    const id = Number(parsedUrl.pathname.slice(1));

    if (!id || id > 900) {
      const message = "Wrong /:id";
      console.error(message, request);
      return new Response(JSON.stringify({ message, ok: false }, null, 2), {
        status: 400,
        headers: {
          "content-type": "application/json;charset=UTF-8",
          ...defaultHeaders,
        },
      });
    }

    const url = `${UNSPLASH_URL}/photos/${imageMapper(id)}`;

    try {
      const res = await fetch(url, {
        headers: {
          "Accept-Version": "v1",
          Authorization: `Client-ID ${env.UNSPLASH_CLIENT_ID}`,
        },
      });

      // TODO any type
      const data: any = await res.json();

      const redirectUrl = data.urls.full;

      return Response.redirect(redirectUrl);
    } catch (error) {
      return genericError(error);
    }
  },
};
