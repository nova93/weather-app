import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo, ip } = req;

  if (process.env.IS_LOCAL) {
    url.searchParams.set("lat", "-37.9517818");
    url.searchParams.set("lon", "145.008277");
    return NextResponse.rewrite(url);
  }

  console.log("Location from Geo", geo);

  if (ip) {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();

    url.searchParams.set("lat", data.lat);
    url.searchParams.set("lon", data.lon);

    console.log("Location from IP", data);

    return NextResponse.rewrite(url);
  }

  if (geo?.latitude && geo?.longitude) {
    url.searchParams.set("lat", geo.latitude);
    url.searchParams.set("lon", geo.longitude);

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
