"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "Cách mạng Tháng Tám diễn ra vào năm nào?",
    options: ["1943", "1944", "1945", "1946"],
    answer: 2,
  },
  {
    question: "Ai là lực lượng lãnh đạo Cách mạng Tháng Tám?",
    options: [
      "Đảng Cộng sản Đông Dương",
      "Quốc dân Đảng",
      "Chính phủ Pháp",
      "Quân đội Nhật",
    ],
    answer: 0,
  },
  {
    question: "Phát xít Nhật tuyên bố đầu hàng Đồng minh vào thời điểm nào?",
    options: [
      "Tháng 3/1945",
      "Tháng 5/1945",
      "Tháng 8/1945",
      "Tháng 9/1945",
    ],
    answer: 2,
  },
  {
    question: "Khởi nghĩa giành chính quyền ở Hà Nội diễn ra vào ngày nào?",
    options: ["19/8/1945", "23/8/1945", "25/8/1945", "30/8/1945"],
    answer: 0,
  },
  {
    question: "Huế giành được chính quyền vào ngày nào?",
    options: ["19/8/1945", "23/8/1945", "25/8/1945", "2/9/1945"],
    answer: 1,
  },
  {
    question: "Sài Gòn giành được chính quyền vào ngày nào?",
    options: ["19/8/1945", "23/8/1945", "25/8/1945", "30/8/1945"],
    answer: 2,
  },
  {
    question: "Ngày 2/9/1945 gắn với sự kiện lịch sử nào?",
    options: [
      "Khởi nghĩa Hà Nội",
      "Nhật đảo chính Pháp",
      "Tổng khởi nghĩa bắt đầu",
      "Tuyên bố độc lập",
    ],
    answer: 3,
  },
  {
    question: "Ai đọc Tuyên ngôn Độc lập ngày 2/9/1945?",
    options: [
      "Võ Nguyên Giáp",
      "Phạm Văn Đồng",
      "Hồ Chí Minh",
      "Trường Chinh",
    ],
    answer: 2,
  },
  {
    question: "Tên nước được tuyên bố thành lập ngày 2/9/1945 là gì?",
    options: [
      "Việt Nam Cộng hòa",
      "Việt Nam Dân chủ Cộng hòa",
      "Đại Việt",
      "Cộng hòa Việt Nam",
    ],
    answer: 1,
  },
  {
    question: "Một ý nghĩa quan trọng của Cách mạng Tháng Tám là gì?",
    options: [
      "Mở đầu Chiến tranh thế giới thứ hai",
      "Giành chính quyền trên phạm vi cả nước",
      "Đưa quân Nhật trở lại Đông Dương",
      "Khôi phục chế độ phong kiến",
    ],
    answer: 1,
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const question = questions[current];

  function chooseAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);
  }

  async function nextQuestion() {
    if (selected === null) return;

    const updatedAnswers = [...answers];
    updatedAnswers[current] = selected;

    setAnswers(updatedAnswers);

    // Nếu chưa phải câu cuối
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      return;
    }

    // ===== TÍNH ĐIỂM =====
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (updatedAnswers[i] === questions[i].answer) {
        score++;
      }
    }

    setFinalScore(score);
    setSaving(true);

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizScore: score,
        }),
      });

      if (!response.ok) {
        console.error("Không thể lưu điểm Quiz.");
      }
    } catch (error) {
      console.error("Lỗi khi lưu điểm Quiz:", error);
    }

    setSaving(false);
    setFinished(true);
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setSaving(false);
    setFinalScore(0);
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8 text-6xl">🎉</div>

          <h1 className="text-4xl font-bold mb-4">
            Hoàn thành Quiz!
          </h1>

          <p className="text-slate-300 text-lg mb-8">
            Bạn đã hoàn thành 10 câu hỏi về Cách mạng Tháng Tám năm 1945.
          </p>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
            <p className="text-slate-400 mb-2">
              Điểm của bạn
            </p>

            <p className="text-6xl font-bold">
              {finalScore}/10
            </p>

            <p className="mt-4 text-slate-300">
              {finalScore === 10
                ? "Xuất sắc! 🏆"
                : finalScore >= 7
                ? "Rất tốt! 👏"
                : finalScore >= 5
                ? "Khá tốt! Hãy ôn lại một chút nhé 📚"
                : "Hãy thử lại để củng cố kiến thức nhé 💪"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition"
            >
              🔄 Làm lại
            </button>

            <Link
              href="/achievements"
              className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300 transition"
            >
              🏆 Xem thành tích
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              🏠 Về trang chủ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition"
          >
            ← Về trang chủ
          </Link>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-400 font-semibold">
                QUIZ LỊCH SỬ
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Cách mạng Tháng Tám năm 1945
              </h1>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-400">
                Câu hỏi
              </p>

              <p className="text-xl font-bold">
                {current + 1}/{questions.length}
              </p>
            </div>
          </div>

          <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
          <p className="text-sm text-slate-400 mb-4">
            Câu {current + 1}
          </p>

          <h2 className="text-2xl font-bold leading-relaxed mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selected === index;
              const isCorrect = index === question.answer;

              let style =
                "border-white/10 bg-white/5 hover:bg-white/10";

              if (selected !== null) {
                if (isCorrect) {
                  style = "border-green-500 bg-green-500/10";
                } else if (isSelected) {
                  style = "border-red-500 bg-red-500/10";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => chooseAnswer(index)}
                  className={`w-full text-left rounded-2xl border p-5 transition ${style}`}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>

                  {option}

                  {selected !== null && isCorrect && (
                    <span className="float-right">✓</span>
                  )}

                  {selected !== null &&
                    isSelected &&
                    !isCorrect && (
                      <span className="float-right">✕</span>
                    )}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="mt-6 rounded-2xl bg-white/5 p-4 text-slate-300">
              {selected === question.answer
                ? "✅ Chính xác!"
                : `❌ Chưa đúng. Đáp án đúng là ${
                    question.options[question.answer]
                  }.`}
            </div>
          )}

          <button
            onClick={nextQuestion}
            disabled={selected === null || saving}
            className="mt-8 w-full rounded-2xl bg-blue-600 py-4 font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {current === questions.length - 1
              ? "Hoàn thành 🎉"
              : "Câu tiếp theo →"}
          </button>
        </section>
      </div>
    </main>
  );
}