"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/me");

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          setUsername(null);
        }
      } catch {
        setUsername(null);
      } finally {
        setCheckingUser(false);
      }
    }

    getUser();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      setUsername(null);
      window.location.reload();
    } catch {
      console.error("Đăng xuất thất bại");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-xl">
              🏛️
            </div>

            <div>
              <h1 className="text-lg font-bold">Sử Học</h1>
              <p className="text-xs text-slate-400">
                Khám phá lịch sử
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <Link href="/" className="hover:text-white">
              Trang chủ
            </Link>

            <Link href="/lesson" className="hover:text-white">
              Bài học
            </Link>

            <Link href="/quiz" className="hover:text-white">
              Quiz
            </Link>
          </nav>

          {/* Tài khoản */}
          <div>
            {checkingUser ? (
              <div className="text-sm text-slate-400">
                Đang tải...
              </div>
            ) : username ? (
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                  👤 {username}
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                >
                  Đăng nhập
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-300"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.15),_transparent_40%)]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">

          <div>
            <div className="mb-6 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
              ✨ Học lịch sử theo cách mới
            </div>

            <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Lịch sử không chỉ là
              <span className="block text-amber-400">
                những con số.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Khám phá những sự kiện, nhân vật và câu chuyện đã tạo nên
              lịch sử Việt Nam thông qua bài học tương tác và quiz thú vị.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/lesson"
                className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Bắt đầu bài học →
              </Link>

              <Link
                href="/lesson"
                className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Khám phá bài học
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">

              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Dòng thời gian
                </span>

                <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                  Lịch sử Việt Nam
                </span>
              </div>

              <div className="space-y-6">

                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-amber-400" />

                  <div>
                    <p className="text-sm text-amber-300">
                      1945
                    </p>

                    <h3 className="mt-1 font-bold">
                      Cách mạng tháng Tám
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Một bước ngoặt lớn trong lịch sử dân tộc.
                    </p>
                  </div>
                </div>

                <div className="ml-1.5 h-10 border-l border-dashed border-white/20" />

                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-slate-500" />

                  <div>
                    <p className="text-sm text-slate-500">
                      1954
                    </p>

                    <h3 className="mt-1 font-bold">
                      Chiến thắng Điện Biên Phủ
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Khám phá diễn biến và ý nghĩa lịch sử.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Topics */}
      <section className="border-t border-white/10 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="mb-10">
            <p className="text-sm font-semibold text-amber-400">
              KHÁM PHÁ
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Bạn muốn học gì hôm nay?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {/* Bài học */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-amber-400/30">
              <div className="text-4xl">
                📚
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Bài học
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Học các sự kiện lịch sử theo từng chủ đề và giai đoạn.
              </p>

              <Link
                href="/lesson"
                className="mt-5 inline-block text-sm font-semibold text-amber-400 hover:text-amber-300"
              >
                Xem bài học →
              </Link>
            </div>

            {/* Quiz */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-amber-400/30">
              <div className="text-4xl">
                🧠
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Quiz
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Kiểm tra kiến thức bằng những câu hỏi nhanh và thú vị.
              </p>

              <Link
                href="/quiz"
                className="mt-5 inline-block text-sm font-semibold text-amber-400 hover:text-amber-300"
              >
                Làm quiz →
              </Link>
            </div>

            {/* Thành tích */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-amber-400/30">
              <div className="text-4xl">
                🏆
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Thành tích
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Theo dõi tiến độ và chinh phục các cột mốc học tập.
              </p>

              <Link
                href="/achievements"
                className="mt-5 inline-block text-sm font-semibold text-amber-400 hover:text-amber-300"
              >
                Xem thành tích →
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}