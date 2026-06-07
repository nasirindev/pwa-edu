"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Lock,
  CheckCircle2,
  Trophy,
  Star,
  Sparkles,
  RotateCcw,
  Volume2,
  AlertCircle
} from "lucide-react";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { decorations } from "@/libs/decorations";

const videos = [
  {
    id: 1,
    title: "Mengenal Bangun Datar 📐",
    src: "/video-1.mp4",
    description: "Belajar mengenal 8 jenis bangun datar yang seru dan menyenangkan!",
    color: "bg-red-500",
    borderColor: "border-red-500",
    textColor: "text-red-500",
    badgeColor: "bg-red-100 text-red-800",
    accentColor: "bg-red-50",
  },
  {
    id: 2,
    title: "Ciri-Ciri Bangun Datar 🔍",
    src: "/video-2.mp4",
    description: "Ayo cari tahu apa saja ciri khas dari setiap bangun datar!",
    color: "bg-green-500",
    borderColor: "border-green-500",
    textColor: "text-green-500",
    badgeColor: "bg-green-100 text-green-800",
    accentColor: "bg-green-50",
  },
  {
    id: 3,
    title: "Tebak Benda Sekitar Kita 🏠",
    src: "/video-3.mp4",
    description: "Menemukan berbagai benda di sekeliling kita yang berbentuk bangun datar!",
    color: "bg-blue-500",
    borderColor: "border-blue-500",
    textColor: "text-blue-500",
    badgeColor: "bg-blue-100 text-blue-800",
    accentColor: "bg-blue-50",
  },
];

export default function VideoPage() {
  const router = useRouter();
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0]); // default level 0 unlocked
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [lockedAlert, setLockedAlert] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pwa-edu-unlocked-videos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUnlockedLevels(parsed);
          // Auto select the highest unlocked index
          const highestUnlocked = Math.max(...parsed);
          setActiveVideoIndex(Math.min(highestUnlocked, videos.length - 1));
        }
      } catch (e) {
        console.error("Gagal memuat level tersimpan", e);
      }
    }
  }, []);

  const handleSelectVideo = (index: number) => {
    if (unlockedLevels.includes(index)) {
      setActiveVideoIndex(index);
      setLockedAlert(null);

      // Load and autoplay the video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch((err) => {
            console.log("Autoplay dicegah oleh browser:", err);
          });
        }
      }, 100);
    } else {
      setLockedAlert(`Nonton Video Level ${index} dulu yuk untuk membuka level ini! 😉`);
      setTimeout(() => {
        setLockedAlert(null);
      }, 3000);
    }
  };

  const handleVideoEnded = () => {
    setShowCelebration(true);
    const nextIndex = activeVideoIndex + 1;
    if (nextIndex < videos.length && !unlockedLevels.includes(nextIndex)) {
      const newUnlocked = [...unlockedLevels, nextIndex];
      setUnlockedLevels(newUnlocked);
      localStorage.setItem("pwa-edu-unlocked-videos", JSON.stringify(newUnlocked));
    }
  };

  const handleNextLevel = () => {
    setShowCelebration(false);
    const nextIndex = activeVideoIndex + 1;
    if (nextIndex < videos.length) {
      handleSelectVideo(nextIndex);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Apakah kamu ingin mengulang belajar dari awal?")) {
      setUnlockedLevels([0]);
      setActiveVideoIndex(0);
      localStorage.setItem("pwa-edu-unlocked-videos", JSON.stringify([0]));
      setShowCelebration(false);
      setLockedAlert(null);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 100);
    }
  };

  const activeVideo = videos[activeVideoIndex];

  return (
    <LayoutWrapper className="bg-yellow-50/30">
      {decorations.map((decor, idx) => (
        <Decoration
          key={idx}
          icon={decor.icon}
          className={decor.className}
          animate={decor.animate}
          transition={decor.transition}
        />
      ))}

      <div className="h-full w-full max-w-3xl flex flex-col p-4 md:p-6 relative space-y-4 md:space-y-6 pb-20">

        {/* Tombol Kembali & Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-white border-[3px] border-gray-800 p-2 rounded-xl shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-black hover:bg-yellow-100"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937] p-3 flex justify-between items-center">
            <h1 className="text-lg md:text-2xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
              <Play className="text-red-500 fill-red-500" size={24} />
              Video Belajar
            </h1>

            <button
              onClick={handleResetProgress}
              title="Ulangi Belajar"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 border-2 border-gray-800 rounded-lg text-red-800 text-xs font-black shadow-[2px_2px_0px_#1f2937] hover:bg-red-200 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>

        {/* Notifikasi Level Terkunci */}
        <AnimatePresence>
          {lockedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-yellow-400 border-[3px] border-gray-800 rounded-xl p-3 shadow-[4px_4px_0px_#1f2937] flex items-center gap-2 text-gray-900 font-bold text-sm"
            >
              <AlertCircle className="shrink-0 text-red-600" size={20} />
              <span>{lockedAlert}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Container Video Utama */}
        <div className="w-full mx-auto bg-white border-4 border-gray-800 rounded-2xl shadow-[8px_8px_0px_#1f2937] overflow-hidden flex flex-col relative">

          {/* Header Video */}
          <div className={`${activeVideo.color} p-3 border-b-4 border-gray-800 flex items-center justify-between transition-colors duration-300`}>
            <div className="flex items-center gap-2">
              <Play size={20} className="text-white fill-white animate-pulse" />
              <span className="text-white font-black uppercase text-xs md:text-sm tracking-wide">
                Sedang Diputar: Level {activeVideo.id}
              </span>
            </div>

            <span className="bg-white/30 text-white font-black px-2 py-0.5 rounded-full text-[10px] md:text-xs">
              {activeVideoIndex + 1} / {videos.length}
            </span>
          </div>

          {/* Wrapper Video dengan Aspect Ratio 16:9 */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              controls
              onEnded={handleVideoEnded}
              className="w-full h-full object-contain"
              poster="/thumbnail.png"
              key={activeVideo.src} // forces reload when source changes
            >
              <source src={activeVideo.src} type="video/mp4" />
              Browser Anda tidak mendukung tag video.
            </video>
          </div>

          {/* Deskripsi Video Aktif */}
          <div className="p-4 border-t-4 border-gray-800 bg-amber-50">
            <h2 className="text-lg font-black text-gray-800">{activeVideo.title}</h2>
            <p className="text-sm font-semibold text-gray-600 mt-1 leading-relaxed">
              {activeVideo.description}
            </p>
          </div>
        </div>

        {/* Roadmap Level: Petualangan Belajar */}
        <div className="space-y-3">
          <h3 className="text-md md:text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-1.5">
            <Sparkles className="text-yellow-500 fill-yellow-500" size={20} />
            Peta Petualangan Belajar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {videos.map((vid, index) => {
              const isUnlocked = unlockedLevels.includes(index);
              const isActive = activeVideoIndex === index;
              const isCompleted = isUnlocked && index < unlockedLevels.length - 1 && index !== activeVideoIndex;

              return (
                <motion.button
                  key={vid.id}
                  whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
                  whileTap={isUnlocked ? { scale: 0.98 } : { scale: 0.95 }}
                  onClick={() => handleSelectVideo(index)}
                  className={`relative border-[3px] border-gray-800 rounded-2xl p-4 flex flex-col items-start text-left shadow-[4px_4px_0px_#1f2937] transition-all overflow-hidden min-h-[110px] ${isActive
                      ? "bg-yellow-100 border-[3px] ring-4 ring-yellow-400"
                      : isUnlocked
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-200/80 opacity-70 cursor-not-allowed"
                    }`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {isActive ? (
                      <span className="bg-yellow-400 text-gray-900 border-2 border-gray-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#1f2937] animate-bounce">
                        AKTIF 🌟
                      </span>
                    ) : isCompleted ? (
                      <span className="bg-green-400 text-white border-2 border-gray-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#1f2937] flex items-center gap-0.5">
                        SELESAI ✅
                      </span>
                    ) : isUnlocked ? (
                      <span className="bg-blue-400 text-white border-2 border-gray-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#1f2937]">
                        SIAP 🚀
                      </span>
                    ) : (
                      <span className="bg-gray-400 text-white border-2 border-gray-800 p-1 rounded-full shadow-[1px_1px_0px_#1f2937]">
                        <Lock size={12} />
                      </span>
                    )}
                  </div>

                  {/* Level Number */}
                  <div className={`w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center font-black text-sm mb-2 shadow-[2px_2px_0px_#1f2937] ${isActive ? "bg-yellow-400" : isUnlocked ? "bg-green-400 text-white" : "bg-gray-400 text-white"
                    }`}>
                    {vid.id}
                  </div>

                  <h4 className={`font-black text-xs md:text-sm mt-1 uppercase tracking-tight ${isUnlocked ? "text-gray-800" : "text-gray-500"
                    }`}>
                    {vid.title}
                  </h4>

                  <p className="text-[11px] font-bold text-gray-500 mt-1 line-clamp-2 leading-tight">
                    {vid.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Modal Selebrasi Kelulusan Level */}
        <AnimatePresence>
          {showCelebration && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white border-4 border-gray-800 rounded-3xl p-6 max-w-md w-full shadow-[8px_8px_0px_#000] text-center relative overflow-hidden flex flex-col items-center space-y-4"
              >
                {/* Efek Bintang Latar Belakang */}
                <div className="absolute top-2 left-2 text-yellow-400 animate-pulse">
                  <Star size={24} fill="currentColor" />
                </div>
                <div className="absolute top-8 right-8 text-yellow-400 animate-bounce">
                  <Sparkles size={24} />
                </div>
                <div className="absolute bottom-4 left-6 text-purple-400 animate-pulse">
                  <Star size={16} fill="currentColor" />
                </div>

                <div className="w-20 h-20 bg-yellow-400 rounded-full border-4 border-gray-800 flex items-center justify-center shadow-[4px_4px_0px_#1f2937] my-2">
                  <Trophy size={44} className="text-gray-800 animate-bounce" />
                </div>

                <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
                  Hebat Sekali! 🎉
                </h3>

                <p className="font-bold text-gray-600 text-sm md:text-base leading-relaxed px-2">
                  Kamu berhasil menyelesaikan pembelajaran di <span className="text-blue-600 font-black">{activeVideo.title}</span>! Kamu luar biasa!
                </p>

                <div className="w-full pt-4 flex flex-col gap-2">
                  {activeVideoIndex < videos.length - 1 ? (
                    <button
                      onClick={handleNextLevel}
                      className="w-full bg-green-400 border-[3px] border-gray-800 py-3 rounded-2xl font-black text-gray-800 shadow-[4px_4px_0px_#1f2937] hover:bg-green-300 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-center uppercase tracking-wider"
                    >
                      Buka Level Berikutnya! 🚀
                    </button>
                  ) : (
                    <div className="space-y-2 w-full">
                      <p className="text-xs text-yellow-600 font-black uppercase">
                        🏆 Kamu telah menyelesaikan seluruh petualangan video!
                      </p>
                      <button
                        onClick={() => router.push("/home")}
                        className="w-full bg-yellow-400 border-[3px] border-gray-800 py-3 rounded-2xl font-black text-gray-800 shadow-[4px_4px_0px_#1f2937] hover:bg-yellow-300 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-center uppercase tracking-wider"
                      >
                        Kembali ke Menu Utama 🏠
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setShowCelebration(false)}
                    className="w-full bg-white border-[3px] border-gray-800 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-100 active:translate-y-0.5 transition-all text-center text-sm"
                  >
                    Nanti Saja / Putar Ulang 🔄
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </LayoutWrapper>
  );
}
