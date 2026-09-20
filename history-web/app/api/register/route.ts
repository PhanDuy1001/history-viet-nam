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
        { message: "Vui lòng nhập tên người dùng và mật khẩu." },
        { status: 400 }
      );
    }

    if (username.length < 3 || username.length > 30) {
      return NextResponse.json(
        { message: "Tên người dùng phải từ 3 đến 30 ký tự." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Mật khẩu phải có ít nhất 6 ký tự." },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { message: "Tên người dùng đã tồn tại." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      passwordHash,
    });

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

    const response = NextResponse.json(
      {
        message: "Đăng ký thành công!",
        username: user.username,
      },
      { status: 201 }
    );

    response.cookies.set("history_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      { message: "Có lỗi xảy ra khi đăng ký." },
      { status: 500 }
    );
  }
}