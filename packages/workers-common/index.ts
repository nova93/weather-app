// TODO: origin should be a wildcard all, methods needs to be adjusted to the app
export const defaultHeaders = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

// TODO: any type
export const genericError = (error?: any) => {
  console.error("Something went wrong", error);
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
