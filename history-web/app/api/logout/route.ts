import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Đăng xuất thành công.",
  });

  response.cookies.set("history_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}