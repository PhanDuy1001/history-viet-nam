"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister() {
    setMessage("");

    if (!username || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (username.length < 3) {
      setMessage("Tên người dùng phải có ít nhất 3 ký tự.");
      return;
    }

    if (password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Đăng ký thất bại.");
        return;
      }

      alert(`Đăng ký thành công! Chào ${data.username} 🎉`);

      router.push("/");
      router.refresh();
    } catch {
      setMessage("Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
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
              Tạo tài khoản
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Tạo tài khoản để lưu tiến độ học tập.
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
                placeholder="Nhập tên người dùng"
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
                placeholder="Ít nhất 6 ký tự"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            {message && (
              <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {message}
              </div>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full rounded-xl bg-amber-400 py-3 font-bold text-slate-950 hover:bg-amber-300 disabled:opacity-50"
            >
              {loading ? "Đang tạo tài khoản..." : "Đăng ký →"}
            </button>

            <p className="text-center text-sm text-slate-400">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-semibold text-amber-400 hover:text-amber-300"
              >
                Đăng nhập
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}