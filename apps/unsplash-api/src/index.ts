/* eslint-disable import/no-anonymous-default-export */
export interface Env {
  UNSPLASH_CLIENT_ID: string;
}

const defaultHeaders = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const QUERY = "query";

const genericError = () => {
  return new Response(
    JSON.stringify({ error: "Something went wrong", ok: false }, null, 2),
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
    if (!parsedUrl.searchParams.has(QUERY)) {
      return new Response(
        JSON.stringify({ error: `${QUERY} is missing`, ok: false }, null, 2),
        {
          status: 400,
          headers: {
            "content-type": "application/json;charset=UTF-8",
            ...defaultHeaders,
          },
        }
      );
    }

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      parsedUrl.searchParams.get(QUERY) ?? ""
    )}&client_id=${env.UNSPLASH_CLIENT_ID}`;

    try {
      const res = await fetch(url);
      // TODO any type
      const data: any = await res.json();

      const redirectUrl = data.results[0].urls.full;

      return Response.redirect(redirectUrl);
    } catch (error) {
      return genericError();
    }
  },
};
