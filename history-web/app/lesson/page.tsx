"use client";

import { useState } from "react";

type Scene = {
  id: number;
  title: string;
  location?: string;
  date?: string;
  description: string[];
  narrator?: string;
  dialogue?: {
    speaker: string;
    text: string;
  };
  info?: {
    title: string;
    text: string;
  };
  visual: string;
  special?: "opening" | "ending";
};

const scenes: Scene[] = [
  {
    id: 1,
    title: "TỈNH DẬY",
    date: "GIỮA THẾ KỶ 20",
    description: [
      "Tại một đêm yên bình ở thế kỉ 20, bạn đang ngon giấc sau một ngày dài làm việc.",
      "Một tiếng báo thức từ chiếc điện thoại bên cạnh.",
      "Bạn mở mắt. Chộp lấy chiếc điện thoại mở màn hình lên nhìn lên màn hình '15-08-1945!!', bạn lập tức bật dậy nhìn xung quanh.",
      "Căn phòng quen thuộc không còn nữa, ngược lại bạn đang ở trong một căn phòng xa lạ tối tâm, lạnh lẻo",
    ],
    dialogue: {
      speaker: "Bạn",
      text: "Đây là đâu? Tại sao tôi lại ở năm 1945?",
    },
    narrator:
      "Bạn nhìn quanh. Mọi thứ đều xa lạ. chiếc điện thoại quen thuộc vẫn ở bên cạnh, nhưng ngoài đường thì không có những âm thanh của thành phố hiện đại.",
    visual: "room",
    special: "opening",
  },

  {
    id: 2,
    title: "NHẬN RA MÌNH ĐANG Ở ĐÂU",
    location: "VIỆT NAM",
    date: "15/8/1945",
    description: [
      "Bạn bước ra ngoài.",
      "Đường phố đông người.",
      "Một tờ báo cũ nằm trên bàn.",
      "Bạn cầm nó lên.",
    ],
    dialogue: {
      speaker: "Người dân",
      text: "Năm 1945.",
    },
    narrator:
      "Chiến tranh thế giới thứ hai đang đi đến hồi kết. Nhật Bản đã tuyên bố đầu hàng Đồng minh.",
    info: {
      title: "15/8/1945",
      text:
        "Ngày Nhật Bản tuyên bố chấp nhận các điều khoản đầu hàng Đồng minh, tạo ra thời cơ đặc biệt để cách mạng ở Việt Nam phát triển.",
    },
    visual: "street",
  },

  {
    id: 3,
    title: "TÂN TRÀO",
    location: "TÂN TRÀO",
    date: "13/8/1945",
    description: [
      "Bạn đứng từ xa.",
      "Một cuộc họp đang diễn ra.",
      "Mọi người trao đổi khẩn trương.",
      "Không khí căng thẳng nhưng quyết đoán.",
    ],
    dialogue: {
      speaker: "Người dân",
      text: "Trên Tân Trào đang quyết định chuyện lớn.",
    },
    narrator:
      "Hội nghị Toàn quốc của Đảng họp tại Tân Trào. Quân lệnh số 1 được ban bố, phát động Tổng khởi nghĩa giành chính quyền.",
    info: {
      title: "TÂN TRÀO",
      text:
        "Tân Trào trở thành một trong những địa điểm quan trọng của cách mạng trong những ngày Tổng khởi nghĩa tháng Tám năm 1945.",
    },
    visual: "tan-trao",
  },

  {
    id: 4,
    title: "MỆNH LỆNH",
    location: "TÂN TRÀO",
    date: "16–17/8/1945",
    description: [
      "Những người đưa tin liên tục lên đường.",
      "Tin tức được truyền đi.",
      "Lá cờ đỏ sao vàng xuất hiện giữa dòng người.",
      "Một thời khắc mới đang đến.",
    ],
    narrator:
      "Từ Tân Trào, mệnh lệnh Tổng khởi nghĩa được truyền đi. Các địa phương chuẩn bị đứng lên giành chính quyền.",
    info: {
      title: "QUỐC DÂN ĐẠI HỘI TÂN TRÀO",
      text:
        "Quốc dân Đại hội họp tại Tân Trào trong tháng 8 năm 1945. Đại hội tán thành chủ trương Tổng khởi nghĩa và thành lập Ủy ban Dân tộc Giải phóng Việt Nam, do Hồ Chí Minh làm Chủ tịch.",
    },
    visual: "flag",
  },

  {
    id: 5,
    title: "HÀ NỘI",
    location: "HÀ NỘI",
    date: "19/8/1945",
    description: [
      "Bạn nghe tiếng người từ phía xa.",
      "Dòng người ngày càng đông.",
      "Quảng trường và những con phố chật kín.",
      "Một thời khắc lịch sử đang diễn ra.",
    ],
    narrator:
      "Ngày 19 tháng 8 năm 1945, cuộc Tổng khởi nghĩa giành chính quyền thắng lợi tại Hà Nội.",
    dialogue: {
      speaker: "Người trong đám đông",
      text: "Hà Nội đã giành được chính quyền!",
    },
    visual: "hanoi",
  },

  {
    id: 6,
    title: "LÀN SÓNG",
    location: "HUẾ",
    date: "23/8/1945",
    description: [
      "Tin tức lan nhanh.",
      "Từ Hà Nội, những thông tin mới đến các địa phương.",
      "Bạn nhìn thấy những đoàn người trên đường.",
      "Lịch sử đang chuyển động trên khắp đất nước.",
    ],
    narrator:
      "Thắng lợi ở Hà Nội tạo thêm động lực cho phong trào ở nhiều địa phương. Ngày 23 tháng 8, khởi nghĩa giành chính quyền thắng lợi tại Huế.",
    info: {
      title: "HUẾ - 23/8/1945",
      text:
        "Tại Huế, chính quyền cách mạng được thiết lập trong những ngày Tổng khởi nghĩa tháng Tám.",
    },
    visual: "hue",
  },

  {
    id: 7,
    title: "SÀI GÒN",
    location: "SÀI GÒN",
    date: "25/8/1945",
    description: [
      "Bạn đứng giữa một dòng người đông đảo.",
      "Những tiếng hô vang khắp các con phố.",
      "Không khí sôi động lan rộng.",
      "Một thành phố lớn đang bước vào thời khắc quyết định.",
    ],
    narrator:
      "Ngày 25 tháng 8 năm 1945, cuộc Tổng khởi nghĩa giành chính quyền thắng lợi tại Sài Gòn và nhiều địa phương Nam Bộ.",
    info: {
      title: "25–28/8/1945",
      text:
        "Trong những ngày cuối tháng 8, chính quyền cách mạng được thiết lập ở nhiều địa phương trên cả nước. Đến ngày 28 tháng 8, cuộc Tổng khởi nghĩa cơ bản giành thắng lợi trong phạm vi cả nước.",
    },
    visual: "saigon",
  },

  {
    id: 8,
    title: "NGỌ MÔN",
    location: "HUẾ",
    date: "30/8/1945",
    description: [
      "Bạn trở lại Huế.",
      "Không khí tại Ngọ Môn trang nghiêm.",
      "Một triều đại đi đến hồi kết.",
      "Một thời kỳ mới bắt đầu.",
    ],
    narrator:
      "Ngày 30 tháng 8 năm 1945, Bảo Đại tuyên bố thoái vị. Chế độ quân chủ ở Việt Nam chấm dứt.",
    info: {
      title: "30/8/1945",
      text:
        "Bảo Đại thoái vị tại Huế, đánh dấu sự kết thúc của chế độ quân chủ Việt Nam.",
    },
    visual: "ngo-mon",
  },

  {
    id: 9,
    title: "BA ĐÌNH",
    location: "HÀ NỘI",
    date: "2/9/1945",
    description: [
      "Bạn đứng giữa một biển người.",
      "Hàng vạn người tập trung tại Ba Đình.",
      "Trên lễ đài xuất hiện Hồ Chí Minh.",
      "Mọi người hướng về phía trước.",
    ],
    narrator:
      "Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Hồ Chí Minh đọc Tuyên ngôn Độc lập, tuyên bố sự ra đời của nước Việt Nam Dân chủ Cộng hòa.",
    info: {
      title: "2/9/1945",
      text:
        "Ngày 2 tháng 9 năm 1945 đánh dấu sự ra đời của nước Việt Nam Dân chủ Cộng hòa.",
    },
    visual: "ba-dinh",
  },

  {
    id: 10,
    title: "TRỞ VỀ",
    date: "THẾ KỶ 21",
    description: [
      "Màn hình dần tối.",
      "Bạn mở mắt.",
      "Bạn đã trở lại căn phòng quen thuộc.",
      "Nhưng những gì vừa chứng kiến vẫn còn trong tâm trí.",
    ],
    narrator:
      "Bạn mở máy tính và tìm kiếm: Cách mạng tháng Tám 1945.",
    visual: "modern",
    special: "ending",
  },
];

const timeline = [
  ["13/8/1945", "Tân Trào", "Quân lệnh số 1, phát động Tổng khởi nghĩa"],
  ["16–17/8/1945", "Tân Trào", "Quốc dân Đại hội"],
  ["19/8/1945", "Hà Nội", "Khởi nghĩa giành chính quyền thắng lợi"],
  ["23/8/1945", "Huế", "Khởi nghĩa giành chính quyền thắng lợi"],
  ["25/8/1945", "Sài Gòn", "Khởi nghĩa giành chính quyền thắng lợi"],
  ["28/8/1945", "Cả nước", "Tổng khởi nghĩa cơ bản thắng lợi"],
  ["30/8/1945", "Huế", "Bảo Đại thoái vị"],
  ["2/9/1945", "Ba Đình", "Tuyên ngôn Độc lập"],
];

function SceneBackground({ type }: { type: string }) {
  const backgrounds: Record<string, string> = {
    room: "bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.12),transparent_28%),linear-gradient(135deg,#020617,#111827,#020617)]",
    street:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.2),transparent_25%),linear-gradient(135deg,#422006,#1e293b,#020617)]",
    "tan-trao":
      "bg-[radial-gradient(circle_at_50%_25%,rgba(34,197,94,0.12),transparent_30%),linear-gradient(135deg,#052e16,#172554,#020617)]",
    flag:
      "bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.18),transparent_28%),linear-gradient(135deg,#450a0a,#1e293b,#020617)]",
    hanoi:
      "bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.24),transparent_25%),linear-gradient(135deg,#451a03,#312e81,#020617)]",
    hue:
      "bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.16),transparent_28%),linear-gradient(135deg,#292524,#312e81,#020617)]",
    saigon:
      "bg-[radial-gradient(circle_at_45%_35%,rgba(239,68,68,0.2),transparent_28%),linear-gradient(135deg,#450a0a,#431407,#020617)]",
    "ngo-mon":
      "bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.25),transparent_28%),linear-gradient(135deg,#451a03,#1c1917,#020617)]",
    "ba-dinh":
      "bg-[radial-gradient(circle_at_50%_30%,rgba(239,68,68,0.22),transparent_28%),linear-gradient(135deg,#450a0a,#172554,#020617)]",
    modern:
      "bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.15),transparent_28%),linear-gradient(135deg,#020617,#0f172a,#000)]",
  };

  return (
    <div
      className={`absolute inset-0 ${
        backgrounds[type] ?? backgrounds.modern
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(0,0,0,0.7))]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_center,#fff_0.5px,transparent_0.5px)] [background-size:5px_5px]" />
    </div>
  );
}

function SceneVisual({
  type,
  sceneId,
}: {
  type: string;
  sceneId: number;
}) {
  const labels: Record<string, string> = {
    room: "CĂN PHÒNG XA LẠ",
    street: "VIỆT NAM • 1945",
    "tan-trao": "TÂN TRÀO",
    flag: "MỆNH LỆNH",
    hanoi: "HÀ NỘI",
    hue: "HUẾ",
    saigon: "SÀI GÒN",
    "ngo-mon": "NGỌ MÔN",
    "ba-dinh": "BA ĐÌNH",
    modern: "THẾ KỶ 21",
  };

  const sceneImages: Record<number, string> = {
    1: "/canh-01.jpg",
    2: "/canh-02.jpg",
    3: "/canh-03.jpg",
    4: "/canh-04.jpg",
    5: "/canh-05.jpg",
    6: "/canh-06.jpg",
    7: "/canh-07.jpg",
    8: "/canh-08.jpg",
    9: "/canh-09.jpg",
    10: "/canh-10.jpg",
  };

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-6 overflow-hidden rounded-[1.5rem]">
        <img
          src={sceneImages[sceneId]}
          alt={`Cảnh ${sceneId}`}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="absolute right-8 top-8 z-10 text-xs font-bold tracking-[0.25em] text-white/50">
        {String(sceneId).padStart(2, "0")}
      </div>

      <div className="absolute bottom-24 left-1/2 z-10 w-full -translate-x-1/2 px-10 text-center">
        <div className="text-xs font-bold tracking-[0.35em] text-white/60">
          {labels[type] ?? "LỊCH SỬ"}
        </div>
      </div>

      <div className="absolute inset-6 rounded-[1.5rem] border border-white/10" />

      <div className="absolute left-0 right-0 top-0 h-5 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-black/40" />
    </div>
  );
}

export default function LessonPage() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [finished, setFinished] = useState(false);

  const scene = scenes[sceneIndex];

  // LƯU TIẾN ĐỘ VÀO MONGODB
  async function saveProgress(sceneId: number) {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sceneId,
        }),
      });
    } catch (error) {
      console.error("Không thể lưu tiến độ:", error);
    }
  }

  const nextScene = async () => {
    // Lưu cảnh hiện tại trước khi chuyển sang cảnh tiếp theo
    await saveProgress(scene.id);

    if (sceneIndex < scenes.length - 1) {
      setSceneIndex((current) => current + 1);
      setShowInfo(false);
    } else {
      setFinished(true);
    }
  };

  const previousScene = () => {
    if (sceneIndex > 0) {
      setSceneIndex((current) => current - 1);
      setShowInfo(false);
    }
  };

  const restart = () => {
    setSceneIndex(0);
    setFinished(false);
    setShowInfo(false);
    setShowTimeline(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <SceneBackground type={scene.visual} />

      {/* HEADER */}
      <header className="relative z-20 flex items-center justify-between border-b border-white/10 bg-black/20 px-5 py-4 backdrop-blur-md md:px-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200"
          >
            <span className="text-base transition-transform group-hover:-translate-x-0.5">
              ←
            </span>

            <span>Về menu</span>
          </button>

          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 font-black text-slate-950">
              S
            </div>

            <div>
              <div className="text-sm font-bold">SỬ HỌC</div>

              <div className="text-[10px] text-slate-500">
                NGƯỜI TRỞ VỀ NĂM 1945
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTimeline(true)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Dòng thời gian
          </button>

          <div className="hidden text-sm text-slate-400 sm:block">
            {sceneIndex + 1} / {scenes.length}
          </div>
        </div>
      </header>

      {/* PROGRESS */}
      <div className="relative z-20 h-1 bg-white/5">
        <div
          className="h-full bg-amber-400 transition-all duration-700"
          style={{
            width: `${((sceneIndex + 1) / scenes.length) * 100}%`,
          }}
        />
      </div>

      {/* CONTENT */}
      <section className="relative z-10 flex min-h-[calc(100vh-70px)] items-center px-5 py-12 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            {scene.location && (
              <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-bold tracking-[0.2em] text-slate-300 backdrop-blur">
                {scene.location}
              </span>
            )}

            {scene.date && (
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-amber-200">
                {scene.date}
              </span>
            )}
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-5 text-sm font-bold tracking-[0.35em] text-amber-300">
                CẢNH {String(scene.id).padStart(2, "0")}
              </div>

              <h1 className="text-5xl font-black leading-[1] tracking-tight md:text-7xl">
                {scene.title}
              </h1>

              <div className="mt-8 space-y-3">
                {scene.description.map((line, index) => (
                  <p
                    key={index}
                    className="text-lg leading-8 text-slate-300 md:text-xl"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {scene.dialogue && (
                <div className="mt-8 max-w-xl rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
                  <div className="text-xs font-bold tracking-[0.2em] text-amber-300">
                    {scene.dialogue.speaker}
                  </div>

                  <div className="mt-2 text-lg italic text-white">
                    “{scene.dialogue.text}”
                  </div>
                </div>
              )}

              {scene.narrator && (
                <div className="mt-8 max-w-2xl border-l-2 border-amber-300/50 pl-5">
                  <div className="text-xs font-bold tracking-[0.2em] text-slate-500">
                    LỜI DẪN
                  </div>

                  <p className="mt-2 leading-7 text-slate-300">
                    {scene.narrator}
                  </p>
                </div>
              )}

              {scene.info && (
                <button
                  onClick={() => setShowInfo(true)}
                  className="mt-8 flex items-center gap-3 rounded-xl border border-amber-300/20 bg-amber-300/10 px-5 py-3 text-sm font-bold text-amber-200 transition hover:bg-amber-300/15"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-amber-300/30">
                    i
                  </span>

                  Xem thông tin lịch sử
                </button>
              )}
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rounded-[2rem] bg-amber-400/10 blur-3xl" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl backdrop-blur">
                <SceneVisual type={scene.visual} sceneId={scene.id} />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 pt-24">
                  <div className="text-xs font-bold tracking-[0.25em] text-slate-500">
                    NGƯỜI TRỞ VỀ NĂM 1945
                  </div>

                  <div className="mt-2 text-xl font-black">
                    {scene.location ?? "HÀNH TRÌNH"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={previousScene}
              disabled={sceneIndex === 0}
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Cảnh trước
            </button>

            <div className="text-center text-xs text-slate-500">
              Lịch sử không thể thay đổi.
              <br />
              Bạn chỉ đang quan sát những gì đã xảy ra.
            </div>

            <button
              onClick={nextScene}
              className="rounded-xl bg-amber-400 px-7 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              {sceneIndex === scenes.length - 1
                ? "Hoàn thành hành trình"
                : "Tiếp tục →"}
            </button>
          </div>
        </div>
      </section>

      {/* INFO */}
      {showInfo && scene.info && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 p-7 shadow-2xl md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-xs font-bold tracking-[0.3em] text-amber-300">
                  THÔNG TIN LỊCH SỬ
                </div>

                <h2 className="mt-3 text-3xl font-black">
                  {scene.info.title}
                </h2>
              </div>

              <button
                onClick={() => setShowInfo(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="leading-8 text-slate-300">
                {scene.info.text}
              </p>
            </div>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-7 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      {/* TIMELINE */}
      {showTimeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/10 bg-slate-950 p-7 shadow-2xl md:p-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold tracking-[0.3em] text-amber-300">
                  NGƯỜI TRỞ VỀ NĂM 1945
                </div>

                <h2 className="mt-3 text-3xl font-black">
                  Dòng thời gian
                </h2>
              </div>

              <button
                onClick={() => setShowTimeline(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-3">
              {timeline.map(([date, place, event], index) => (
                <button
                  key={`${date}-${place}-${index}`}
                  onClick={() => {
                    let foundIndex = -1;

                    if (date === "13/8/1945") foundIndex = 2;
                    if (date === "16–17/8/1945") foundIndex = 3;
                    if (date === "19/8/1945") foundIndex = 4;
                    if (date === "23/8/1945") foundIndex = 5;
                    if (date === "25/8/1945") foundIndex = 6;
                    if (date === "28/8/1945") foundIndex = 6;
                    if (date === "30/8/1945") foundIndex = 7;
                    if (date === "2/9/1945") foundIndex = 8;

                    if (foundIndex >= 0) {
                      setSceneIndex(foundIndex);
                      setShowTimeline(false);
                    }
                  }}
                  className="group flex w-full items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-amber-300/30 hover:bg-white/[0.06]"
                >
                  <div className="w-28 shrink-0 text-sm font-bold text-amber-300">
                    {date}
                  </div>

                  <div className="h-2 w-2 shrink-0 rounded-full bg-amber-300" />

                  <div className="min-w-0">
                    <div className="font-bold">{place}</div>

                    <div className="mt-1 text-sm leading-6 text-slate-500">
                      {event}
                    </div>
                  </div>

                  <div className="ml-auto text-slate-600 transition group-hover:translate-x-1 group-hover:text-amber-300">
                    →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FINISHED */}
      {finished && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black p-6">
          <div className="max-w-3xl text-center">
            <div className="text-sm font-bold tracking-[0.35em] text-amber-300">
              HÀNH TRÌNH HOÀN TẤT
            </div>

            <h2 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
              CÁCH MẠNG
              <br />
              THÁNG TÁM 1945
            </h2>

            <div className="mx-auto mt-10 max-w-2xl">
              <div className="text-lg leading-8 text-slate-300 md:text-xl">
                Bạn đã đi qua những mốc thời gian quan trọng từ Tân Trào,
                Hà Nội, Huế, Sài Gòn đến Ba Đình.
              </div>

              <div className="mt-8 border-y border-white/10 py-8 text-lg italic leading-8 text-slate-400">
                “Lịch sử không thể thay đổi.
                <br />
                Nhưng cách chúng ta nhìn về lịch sử có thể thay đổi.”
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => {
                  setFinished(false);
                  setShowTimeline(true);
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                Khám phá dòng thời gian
              </button>

              <button
                onClick={restart}
                className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Xem lại hành trình
              </button>

              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/5"
              >
                🏠 Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}