import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!validUser || !validPass || !secret) {
    return NextResponse.json(
      { error: "Server chưa cấu hình credentials" },
      { status: 500 },
    );
  }

  if (username !== validUser || password !== validPass) {
    return NextResponse.json(
      { error: "Tên đăng nhập hoặc mật khẩu không đúng" },
      { status: 401 },
    );
  }

  // tạo session token = HMAC-SHA256("admin_session", secret)
  const token = createHmac("sha256", secret)
    .update("admin_session")
    .digest("hex");

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 giờ
  });
  return res;
}
