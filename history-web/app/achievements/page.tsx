"use client";

import Link from "next/link";

const achievements = [
  {
    icon: "📖",
    title: "Người khám phá",
    description: "Hoàn thành bài học đầu tiên",
    progress: "Đã hoàn thành",
    unlocked: true,
  },
  {
    icon: "🧠",
    title: "Nhà sử học trẻ",
    description: "Hoàn thành Quiz lịch sử",
    progress: "Đã mở khóa",
    unlocked: true,
  },
  {
    icon: "🏆",
    title: "Bậc thầy lịch sử",
    description: "Đạt 10/10 điểm trong Quiz",
    progress: "Chưa mở khóa",
    unlocked: false,
  },
  {
    icon: "⭐",
    title: "Học tập chăm chỉ",
    description: "Hoàn thành 5 bài học",
    progress: "1/5 bài học",
    unlocked: false,
  },
];

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-amber-400">
              SỬ HỌC
            </p>

            <h1 className="text-xl font-bold">
              Thành tích
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            🏠 Trang chủ
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold text-amber-400">
            TIẾN ĐỘ CỦA BẠN
          </p>

          <h2 className="mt-2 text-4xl font-black">
            Hành trình khám phá lịch sử
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            Theo dõi những gì bạn đã hoàn thành và mở khóa
            các thành tích mới trong quá trình học.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">
              Bài học hoàn thành
            </p>

            <p className="mt-3 text-4xl font-black">
              1
            </p>

            <p className="mt-2 text-sm text-slate-500">
              / 10 bài học
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">
              Quiz đã hoàn thành
            </p>

            <p className="mt-3 text-4xl font-black">
              1
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Quiz
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">
              Thành tích đã mở khóa
            </p>

            <p className="mt-3 text-4xl font-black">
              2
            </p>

            <p className="mt-2 text-sm text-slate-500">
              / 4 thành tích
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">
                Tiến độ học tập
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Bạn đã hoàn thành 10% hành trình hiện tại.
              </p>
            </div>

            <span className="text-xl font-bold text-amber-400">
              10%
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-amber-400"
              style={{ width: "10%" }}
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold">
            🏅 Huy hiệu
          </h3>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className={`rounded-2xl border p-6 transition ${
                  achievement.unlocked
                    ? "border-amber-400/30 bg-amber-400/5"
                    : "border-white/10 bg-white/5 opacity-60"
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                    {achievement.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-bold">
                        {achievement.title}
                      </h4>

                      {achievement.unlocked && (
                        <span className="text-sm">
                          ✓
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      {achievement.description}
                    </p>

                    <p
                      className={`mt-3 text-sm font-semibold ${
                        achievement.unlocked
                          ? "text-amber-400"
                          : "text-slate-500"
                      }`}
                    >
                      {achievement.progress}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/lesson"
            className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
          >
            📖 Tiếp tục học
          </Link>

          <Link
            href="/quiz"
            className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            🧠 Làm Quiz
          </Link>
        </div>
      </section>
    </main>
  );
}

