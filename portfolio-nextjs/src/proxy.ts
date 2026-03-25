import { NextRequest, NextResponse } from "next/server";

// Tính HMAC-SHA256 bằng Web Crypto API (Edge Runtime compatible)
async function computeToken(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode("admin_session"),
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cho phép truy cập trang login và API auth
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_token")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!token || !secret) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const expected = await computeToken(secret);
  if (token !== expected) {
    const res = NextResponse.redirect(new URL("/admin/login", req.url));
    res.cookies.delete("admin_token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
