import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.redirect(new URL("/no-demo", req.url));
  }

  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) {
      return NextResponse.redirect(new URL("/no-demo", req.url));
    }
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.redirect(new URL("/no-demo", req.url));
  }
}
