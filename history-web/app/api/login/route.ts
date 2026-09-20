import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("Thiếu JWT_SECRET trong file .env.local");
}

if (!JWT_SECRET) {
  throw new Error("Thiếu JWT_SECRET trong file .env.local");
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { message: "Tên người dùng hoặc mật khẩu không đúng." },
        { status: 401 }
      );
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return NextResponse.json(
        { message: "Tên người dùng hoặc mật khẩu không đúng." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      message: "Đăng nhập thành công!",
      username: user.username,
    });

    response.cookies.set("history_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Có lỗi xảy ra khi đăng nhập." },
      { status: 500 }
    );
  }
}