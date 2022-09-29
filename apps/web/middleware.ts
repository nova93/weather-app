import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  if (geo?.latitude && geo?.longitude) {
    url.searchParams.set("lat", geo.latitude);
    url.searchParams.set("lon", geo.longitude);
  }

  console.log("req", req);

  // TODO: might not be needed?
  if (req.ip) {
    const res = await fetch(`http://ip-api.com/json/${req.ip}`);
    const data = await res.json();

    console.log("data", data);
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/",
};
