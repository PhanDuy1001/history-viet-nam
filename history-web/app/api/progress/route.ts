import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Progress from "@/models/Progress";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("Thiếu JWT_SECRET trong file .env.local");
}

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("history_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
    };

    return decoded.userId;
  } catch {
    return null;
  }
}

// Lấy tiến độ
export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Bạn chưa đăng nhập." },
        { status: 401 }
      );
    }

    await connectDB();

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = await Progress.create({
        userId,
        completedScenes: [],
        quizScore: 0,
        quizCompleted: false,
      });
    }

    return NextResponse.json({
      completedScenes: progress.completedScenes,
      quizScore: progress.quizScore,
      quizCompleted: progress.quizCompleted,
    });
  } catch (error) {
    console.error("Get progress error:", error);

    return NextResponse.json(
      { message: "Không thể lấy tiến độ." },
      { status: 500 }
    );
  }
}

// Cập nhật tiến độ
export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Bạn chưa đăng nhập." },
        { status: 401 }
      );
    }

    const body = await request.json();

    await connectDB();

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = await Progress.create({
        userId,
        completedScenes: [],
        quizScore: 0,
        quizCompleted: false,
      });
    }

    if (body.sceneId !== undefined) {
      const sceneId = Number(body.sceneId);

      if (
        !progress.completedScenes.includes(sceneId)
      ) {
        progress.completedScenes.push(sceneId);
      }
    }

    if (body.quizScore !== undefined) {
      progress.quizScore = Number(body.quizScore);
      progress.quizCompleted = true;
    }

    await progress.save();

    return NextResponse.json({
      message: "Đã lưu tiến độ.",
      completedScenes: progress.completedScenes,
      quizScore: progress.quizScore,
      quizCompleted: progress.quizCompleted,
    });
  } catch (error) {
    console.error("Save progress error:", error);

    return NextResponse.json(
      { message: "Không thể lưu tiến độ." },
      { status: 500 }
    );
  }
}