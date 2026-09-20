import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("Thiếu JWT_SECRET trong file .env.local");
}

if (!JWT_SECRET) {
  throw new Error("Thiếu JWT_SECRET trong file .env.local");
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("history_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Chưa đăng nhập." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
    };

    return NextResponse.json({
      username: decoded.username,
    });
  } catch {
    return NextResponse.json(
      { message: "Phiên đăng nhập không hợp lệ." },
      { status: 401 }
    );
  }
}