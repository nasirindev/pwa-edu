"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { motion, AnimatePresence } from "framer-motion";
import { decorations } from "@/libs/decorations";
import { slides } from "@/libs/materi";

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
        const windowWidth = window.innerWidth * 0.9; // Beri margin 10%
        const windowHeight = window.innerHeight * 0.85;

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
        className="relative shadow-2xl bg-white border-4 border-gray-800 rounded-3xl p-8 h-155 flex flex-col shrink-0"
      >
        {/* Header */}
        <div className="flex items-center gap-4 flex-none mb-6">
          <button
            onClick={() => router.back()}
            className="bg-white border-[3px] border-gray-800 p-3 rounded-xl shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937] p-3 text-center">
            <h1 className="text-3xl font-black text-gray-800 uppercase italic">
              Materi Bangun Datar
            </h1>
          </div>
        </div>

        {/* Konten Slide */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full bg-white border-4 border-gray-800 rounded-2xl shadow-[8px_8px_0px_#1f2937] p-8 flex gap-8"
            >
              <div className="flex-1 space-y-6">
                <div className="inline-block bg-orange-500 border-2 border-gray-800 px-6 py-2 rounded-full text-white font-black uppercase text-sm shadow-[2px_2px_0px_#000]">
                  {slides[current].name || "Pengenalan"}
                </div>
                <h2 className="text-2xl font-black text-gray-800 leading-tight">
                  {slides[current].title || slides[current].name}
                </h2>
                <p className="text-xl font-bold text-gray-600 leading-relaxed">
                  {slides[current].content || slides[current].def}
                </p>

                {slides[current].benda && (
                  <div className="bg-blue-100 border-4 border-gray-800 p-4 rounded-2xl shadow-[4px_4px_0px_#1f2937]">
                    <p className="text-sm font-black text-blue-800 uppercase mb-1">
                      Contoh Benda:
                    </p>
                    <p className="text-lg font-bold text-gray-800 italic">
                      {slides[current].benda}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-gray-50 border-4 border-dashed border-gray-300 rounded-2xl p-6 overflow-y-auto custom-scrollbar">
                <h3 className="font-black text-gray-800 uppercase text-lg mb-4 border-b-4 border-gray-800 pb-2 inline-block">
                  Ciri-Ciri & Unsur:
                </h3>
                <ul className="space-y-4">
                  {(slides[current].details || slides[current].ciri).map(
                    (item: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-lg font-bold text-gray-700"
                      >
                        <div className="mt-2 w-3 h-3 bg-orange-500 rounded-full shrink-0 border-2 border-gray-800" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                  {slides[current].unsur && (
                    <li className="mt-6 p-4 bg-yellow-100 border-4 border-gray-800 rounded-xl text-sm font-black italic shadow-[4px_4px_0px_#1f2937] text-black">
                      {slides[current].unsur}
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Kontrol Navigasi */}
        <div className="flex justify-between items-center mt-8 flex-none">
          <button
            onClick={prevSlide}
            disabled={current === 0}
            className="flex items-center gap-3 bg-white border-4 text-black border-gray-800 px-8 py-3 rounded-2xl font-black uppercase shadow-[6px_6px_0px_#1f2937] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-30"
          >
            <ChevronLeft size={28} /> Prev
          </button>

          <div className="font-black text-2xl text-gray-400 bg-gray-100 px-6 py-2 rounded-full border-2 border-gray-200">
            {current + 1} <span className="text-gray-300">/</span>{" "}
            {slides.length}
          </div>

          <button
            onClick={nextSlide}
            disabled={current === slides.length - 1}
            className="flex items-center gap-3 bg-orange-500 text-white border-4 border-gray-800 px-8 py-3 rounded-2xl font-black uppercase shadow-[6px_6px_0px_#1f2937] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-30"
          >
            Next <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}
