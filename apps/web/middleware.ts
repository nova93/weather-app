import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { nextUrl: url, geo } = req;

  event.waitUntil(
    fetch(`http://ip-api.com/json/${req.ip}`)
      .then((res) => res.json())
      .then((data) => console.log("data", data))
  );

  console.log("req", req);
  if (geo?.latitude && geo?.longitude) {
    url.searchParams.set("lat", geo.latitude);
    url.searchParams.set("lon", geo.longitude);
    return NextResponse.rewrite(url);
  }

  // TODO: might not be needed?
  // if (req.ip) {
  //   const res = await fetch(`http://ip-api.com/json/${req.ip}`);
  //   const data = await res.json();

  //   console.log("data", data);
  // }
}

export const config = {
  matcher: "/",
};
