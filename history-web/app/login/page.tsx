"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!username || !password) {
      alert("Vui lòng nhập tên người dùng và mật khẩu.");
      return;
    }

    localStorage.setItem("history_username", username);
    alert(`Đăng nhập thành công! Chào ${username} 👋`);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Về trang chủ
        </Link>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-3xl">
              🏛️
            </div>

            <h1 className="mt-6 text-3xl font-black">
              Đăng nhập
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Đăng nhập để theo dõi tiến độ học tập.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Tên người dùng
              </label>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên của bạn"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Mật khẩu
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-xl bg-amber-400 py-3 font-bold text-slate-950 hover:bg-amber-300"
            >
              Đăng nhập →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}