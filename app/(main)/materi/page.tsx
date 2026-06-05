"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy, BookOpen } from "lucide-react";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { motion, AnimatePresence } from "framer-motion";
import { decorations } from "@/libs/decorations";
import { slides } from "@/libs/slides";

// Definisi visualisasi bangun datar dengan SVG dan animasi Framer Motion yang bervariasi
const shapeData: Record<
  string,
  {
    color: string;
    hex: string;
    getAnimate: (isClicked: boolean, clickCount: number) => any;
    getTransition: (isClicked: boolean) => any;
    svg: (fill: string) => React.ReactNode;
  }
> = {
  Persegi: {
    color: "bg-blue-500 border-blue-600",
    hex: "#3b82f6",
    getAnimate: (isClicked, clickCount) => ({
      y: [0, -12, 0],
      rotate: clickCount * 360,
    }),
    getTransition: (isClicked) => ({
      y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
      rotate: { type: "spring", stiffness: 100, damping: 10 },
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <rect x="15" y="15" width="70" height="70" rx="6" fill={fill} stroke="#1f2937" strokeWidth="6" />
      </svg>
    ),
  },
  "Persegi Panjang": {
    color: "bg-indigo-500 border-indigo-600",
    hex: "#6366f1",
    getAnimate: (isClicked, clickCount) => ({
      x: [-15, 15, -15],
      rotate: isClicked ? [0, 10, -10, 0] : 0,
    }),
    getTransition: (isClicked) => ({
      x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
      rotate: { duration: 0.5, ease: "easeInOut" },
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <rect x="10" y="25" width="80" height="50" rx="6" fill={fill} stroke="#1f2937" strokeWidth="6" />
      </svg>
    ),
  },
  Segitiga: {
    color: "bg-emerald-500 border-emerald-600",
    hex: "#10b981",
    getAnimate: (isClicked, clickCount) => ({
      y: isClicked ? [0, -60, 10, -5, 0] : [0, -8, 0],
      scaleY: isClicked ? [1, 0.5, 1.2, 0.9, 1] : 1,
      scaleX: isClicked ? [1, 1.3, 0.8, 1.1, 1] : 1,
    }),
    getTransition: (isClicked) => ({
      y: isClicked
        ? { duration: 0.8, ease: "easeOut" }
        : { repeat: Infinity, duration: 3, ease: "easeInOut" },
      scaleY: { duration: 0.8, ease: "easeOut" },
      scaleX: { duration: 0.8, ease: "easeOut" },
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <polygon points="50,15 88,80 12,80" fill={fill} stroke="#1f2937" strokeWidth="6" strokeLinejoin="round" />
      </svg>
    ),
  },
  Lingkaran: {
    color: "bg-rose-500 border-rose-600",
    hex: "#f43f5e",
    getAnimate: (isClicked, clickCount) => ({
      x: isClicked ? 0 : [-25, 25, -25],
      rotate: isClicked ? clickCount * 720 : [-180, 180, -180],
    }),
    getTransition: (isClicked) => ({
      x: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
      rotate: isClicked
        ? { duration: 1.2, ease: "circOut" }
        : { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <circle cx="50" cy="50" r="35" fill={fill} stroke="#1f2937" strokeWidth="6" />
        <line x1="50" y1="50" x2="50" y2="15" stroke="#1f2937" strokeWidth="4" />
      </svg>
    ),
  },
  "Jajar Genjang": {
    color: "bg-orange-500 border-orange-600",
    hex: "#f97316",
    getAnimate: (isClicked, clickCount) => ({
      skewX: isClicked ? [-20, 20, -10, 10, 0] : [-6, 6, -6],
      y: [0, -6, 0],
    }),
    getTransition: (isClicked) => ({
      skewX: isClicked ? { duration: 0.8 } : { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
      y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <polygon points="30,25 88,25 70,75 12,75" fill={fill} stroke="#1f2937" strokeWidth="6" strokeLinejoin="round" />
      </svg>
    ),
  },
  Trapesium: {
    color: "bg-amber-500 border-amber-600",
    hex: "#f59e0b",
    getAnimate: (isClicked, clickCount) => ({
      scaleY: isClicked ? [1, 0.6, 1.2, 0.9, 1] : [1, 0.96, 1],
      y: isClicked ? [0, -20, 0] : 0,
    }),
    getTransition: (isClicked) => ({
      scaleY: isClicked ? { duration: 0.6 } : { repeat: Infinity, duration: 3, ease: "easeInOut" },
      y: isClicked ? { duration: 0.6 } : {},
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <polygon points="30,25 70,25 88,75 12,75" fill={fill} stroke="#1f2937" strokeWidth="6" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Belah Ketupat": {
    color: "bg-purple-500 border-purple-600",
    hex: "#a855f7",
    getAnimate: (isClicked, clickCount) => ({
      y: [0, -10, 0],
      rotateY: clickCount * 360,
    }),
    getTransition: (isClicked) => ({
      y: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
      rotateY: { duration: 1, ease: "easeInOut" },
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <polygon points="50,15 80,50 50,85 20,50" fill={fill} stroke="#1f2937" strokeWidth="6" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Layang-layang": {
    color: "bg-cyan-500 border-cyan-600",
    hex: "#06b6d4",
    getAnimate: (isClicked, clickCount) => ({
      x: isClicked ? [0, 20, -20, 0] : [0, 12, -8, 0],
      y: isClicked ? [0, -40, 20, 0] : [0, -12, 6, 0],
      rotate: isClicked ? [0, 180, 360] : [5, -5, 5],
    }),
    getTransition: (isClicked) => ({
      x: isClicked ? { duration: 1.2 } : { repeat: Infinity, duration: 5, ease: "easeInOut" },
      y: isClicked ? { duration: 1.2 } : { repeat: Infinity, duration: 5, ease: "easeInOut" },
      rotate: isClicked ? { duration: 1.2 } : { repeat: Infinity, duration: 5, ease: "easeInOut" },
    }),
    svg: (fill) => (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_#1f2937]">
        <polygon points="50,15 82,45 50,85 18,45" fill={fill} stroke="#1f2937" strokeWidth="6" strokeLinejoin="round" />
        <path d="M50,85 Q45,95 50,105" fill="none" stroke="#1f2937" strokeWidth="3" />
      </svg>
    ),
  },
};

// Komponen Visualizer Bangun Datar Interaktif
const InteractiveShape = ({ name, size = 150, isDock = false, isActive = false }: { name: string; size?: number; isDock?: boolean; isActive?: boolean }) => {
  const [clickCount, setClickCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const data = shapeData[name];
  if (!data) return null;

  const handleClick = () => {
    if (isDock) return;
    setClickCount((prev) => prev + 1);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
  };

  const anim = isDock
    ? { y: isActive ? [0, -4, 0] : 0 }
    : data.getAnimate(isClicked, clickCount);

  const trans = isDock
    ? { y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
    : data.getTransition(isClicked);

  return (
    <motion.div
      onClick={handleClick}
      animate={anim}
      transition={trans}
      whileHover={isDock ? {} : { scale: 1.05 }}
      style={{ width: size, height: size }}
      className={`flex items-center justify-center select-none ${!isDock ? "cursor-pointer active:scale-95" : ""}`}
    >
      {data.svg(isDock && isActive ? "#fff" : data.hex)}
    </motion.div>
  );
};

export default function MateriPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menghitung skala otomatis agar konten pas di layar
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const targetWidth = 1100; // Lebar standar desain
        const targetHeight = 620; // Tinggi standar desain (16:9 approx)
        const windowWidth = window.innerWidth * 0.95; // Beri margin agar tidak mepet
        const windowHeight = window.innerHeight * 0.9;

        const scaleX = windowWidth / targetWidth;
        const scaleY = windowHeight / targetHeight;

        // Pilih skala terkecil agar tidak terpotong
        const newScale = Math.min(scaleX, scaleY, 1);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () =>
    current < slides.length - 1 && setCurrent(current + 1);
  const prevSlide = () => current > 0 && setCurrent(current - 1);

  // Daftar item untuk Dermaga Navigasi Bangun Datar
  const dockItems = [
    { label: "Pengantar", slideIndex: 0, icon: <BookOpen size={20} /> },
    { label: "Persegi", slideIndex: 3, shapeName: "Persegi" },
    { label: "P. Panjang", slideIndex: 4, shapeName: "Persegi Panjang" },
    { label: "Segitiga", slideIndex: 5, shapeName: "Segitiga" },
    { label: "Lingkaran", slideIndex: 6, shapeName: "Lingkaran" },
    { label: "J. Genjang", slideIndex: 7, shapeName: "Jajar Genjang" },
    { label: "Trapesium", slideIndex: 8, shapeName: "Trapesium" },
    { label: "B. Ketupat", slideIndex: 9, shapeName: "Belah Ketupat" },
    { label: "Layang²", slideIndex: 10, shapeName: "Layang-layang" },
  ];

  return (
    <LayoutWrapper className="bg-yellow-50/30 w-full h-full flex items-center justify-center overflow-hidden">
      {decorations.map((dec, idx) => (
        <Decoration key={idx} {...dec} />
      ))}

      {/* Container utama dengan skala dinamis */}
      <div
        ref={containerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: "1100px", // Lebar tetap yang akan diskalakan
          transition: "transform 0.3s ease-out",
        }}
        className="relative shadow-2xl bg-white border-4 border-gray-800 rounded-3xl p-6 h-[620px] flex flex-col shrink-0"
      >
        {/* Header */}
        <div className="flex items-center gap-4 flex-none mb-3">
          <button
            onClick={() => router.back()}
            className="bg-white border-[3px] border-gray-800 p-2.5 rounded-xl shadow-[3px_3px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-black cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl shadow-[3px_3px_0px_#1f2937] p-2 text-center">
            <h1 className="text-2xl font-black text-gray-800 uppercase italic leading-none">
              Materi Bangun Datar
            </h1>
          </div>
        </div>

        {/* Dermaga Navigasi Bangun Datar (Interactive Shape Dock) */}
        <div className="flex justify-between items-center gap-1.5 mb-3 bg-gray-50 border-[3px] border-gray-800 p-1.5 rounded-2xl shadow-[3px_3px_0px_#1f2937] flex-none">
          {dockItems.map((item, idx) => {
            const isActive =
              item.slideIndex === 0
                ? current < 3
                : current === item.slideIndex;

            const themeColor = item.shapeName
              ? shapeData[item.shapeName].color
              : "bg-orange-500 border-orange-600";

            return (
              <button
                key={idx}
                onClick={() => setCurrent(item.slideIndex)}
                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl border-2 border-gray-800 transition-all font-black uppercase text-[10px] tracking-tight cursor-pointer
                  ${isActive
                    ? `${themeColor} text-white shadow-[2px_2px_0px_#1f2937] -translate-y-0.5`
                    : "bg-white text-gray-800 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 shadow-none"
                  }`}
              >
                <div className="w-8 h-8 flex items-center justify-center mb-0.5">
                  {item.shapeName ? (
                    <InteractiveShape name={item.shapeName} size={28} isDock={true} isActive={isActive} />
                  ) : (
                    <div className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                      {item.icon}
                    </div>
                  )}
                </div>
                <span className="truncate w-full text-center leading-none text-[9px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Konten Slide */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full bg-white border-4 border-gray-800 rounded-2xl shadow-[6px_6px_0px_#1f2937] p-5 flex gap-5 overflow-hidden"
            >
              {current < 3 ? (
                // --- TATA LETAK 2 KOLOM (Untuk Slide Pengantar: Intro, Ciri Umum, Unsur) ---
                <>
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    <div className="inline-block bg-orange-500 border-2 border-gray-800 px-5 py-1.5 rounded-full text-white font-black uppercase text-xs shadow-[2px_2px_0px_#000] w-fit">
                      {slides[current].name || "Pengenalan"}
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 leading-tight">
                      {slides[current].title || slides[current].name}
                    </h2>
                    <p className="text-lg font-bold text-gray-600 leading-relaxed">
                      {slides[current].content || slides[current].def}
                    </p>

                    {/* Hiasan Bangun Datar Melayang Interaktif di Halaman Pengantar */}
                    <div className="flex gap-4 pt-2">
                      {Object.keys(shapeData).slice(0, 4).map((shapeName) => (
                        <motion.div
                          key={shapeName}
                          animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, ease: "easeInOut" }}
                          className="opacity-40 hover:opacity-100 transition-opacity"
                        >
                          <InteractiveShape name={shapeName} size={42} isDock={true} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl p-5 overflow-y-auto custom-scrollbar flex flex-col justify-center">
                    <h3 className="font-black text-gray-800 uppercase text-md mb-3 border-b-4 border-gray-800 pb-1.5 inline-block w-fit">
                      Penjelasan Detail:
                    </h3>
                    <ul className="space-y-3">
                      {(slides[current].details || slides[current].ciri).map(
                        (item: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-base font-bold text-gray-700 leading-relaxed"
                          >
                            <div className="mt-2 w-2.5 h-2.5 bg-orange-500 rounded-full shrink-0 border-2 border-gray-800" />
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                // --- TATA LETAK 3 KOLOM BARU (Untuk Slide Bangun Datar Spesifik) ---
                <>
                  {/* Kolom 1: Deskripsi Materi */}
                  <div className="w-[30%] flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      <div className="inline-block bg-orange-500 border-2 border-gray-800 px-4 py-1.5 rounded-full text-white font-black uppercase text-xs shadow-[2px_2px_0px_#000] w-fit">
                        {slides[current].name || "Pengenalan"}
                      </div>
                      <h2 className="text-2xl font-black text-gray-800 leading-tight">
                        {slides[current].title || slides[current].name}
                      </h2>
                      <p className="text-sm font-bold text-gray-500 leading-relaxed">
                        {slides[current].content || slides[current].def}
                      </p>
                    </div>

                    {slides[current].benda && (
                      <div className="bg-blue-50 border-[3px] border-gray-800 p-3 rounded-xl shadow-[3px_3px_0px_#1f2937] shrink-0">
                        <p className="text-[10px] font-black text-blue-800 uppercase mb-0.5">
                          Contoh Benda:
                        </p>
                        <p className="text-xs font-bold text-gray-700 italic leading-snug">
                          {slides[current].benda}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Kolom 2: Visualisasi Bangun Datar Interaktif ("Jalan/Bergerak") */}
                  <div className="w-[35%] flex flex-col items-center justify-center bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl p-4 relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-black bg-white border-2 border-gray-800 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shadow-[1px_1px_0px_#000]">
                      Visualisasi Interaktif
                    </div>

                    <InteractiveShape name={slides[current].name as string} size={130} />

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mt-3 text-[10px] font-black uppercase text-gray-400 bg-white border-2 border-gray-200 px-3 py-1 rounded-full shadow-[2px_2px_0px_#e5e7eb] cursor-default"
                    >
                      Sentuh Aku! 👆
                    </motion.div>
                  </div>

                  {/* Kolom 3: Ciri-Ciri & Unsur */}
                  <div className="w-[35%] bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex-1 flex flex-col min-h-0">
                      <h3 className="font-black text-gray-800 uppercase text-sm mb-2 border-b-4 border-gray-800 pb-1.5 inline-block w-fit">
                        Ciri-Ciri:
                      </h3>
                      <ul className="space-y-1.5 overflow-y-auto pr-1 flex-1 custom-scrollbar text-black">
                        {(slides[current].details || slides[current].ciri).map(
                          (item: string, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs font-bold text-gray-650 leading-snug"
                            >
                              <div className="mt-1 w-2 h-2 bg-orange-500 rounded-full shrink-0 border-2 border-gray-800" />
                              <span>{item}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    {slides[current].unsur && (
                      <div className="mt-2.5 p-2 bg-yellow-100 border-[3px] border-gray-800 rounded-xl text-[10px] font-black italic shadow-[2px_2px_0px_#1f2937] text-black shrink-0 leading-tight">
                        {slides[current].unsur}
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Kontrol Navigasi */}
        <div className="flex justify-between items-center mt-3 flex-none">
          <button
            onClick={prevSlide}
            disabled={current === 0}
            className="flex items-center gap-2 bg-white border-4 text-black border-gray-800 px-6 py-2 rounded-2xl font-black uppercase text-sm shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft size={20} /> Prev
          </button>

          <div className="font-black text-lg text-gray-400 bg-gray-100 px-5 py-1.5 rounded-full border-2 border-gray-200">
            {current + 1} <span className="text-gray-300">/</span>{" "}
            {slides.length}
          </div>

          <button
            onClick={nextSlide}
            disabled={current === slides.length - 1}
            className="flex items-center gap-2 bg-orange-500 text-white border-4 border-gray-800 px-6 py-2 rounded-2xl font-black uppercase text-sm shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-30 cursor-pointer"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}

