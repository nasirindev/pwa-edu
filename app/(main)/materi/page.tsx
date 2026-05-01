"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { motion, AnimatePresence } from "framer-motion";
import { decorations } from "@/libs/decorations";

// Data Slides tetap sama sesuai materi

const slides = [
  {
    type: "intro",
    title: "Apa itu Bangun Datar?",
    content:
      "Bangun datar adalah bagian dari geometri yang mempelajari bentuk-bentuk dua dimensi (2D), yaitu bentuk yang hanya memiliki panjang dan lebar, tetapi tidak memiliki tinggi atau ketebalan.",
    details: [
      "Hanya menempati suatu bidang permukaan dan tidak memiliki volume.",
      "Tersusun dari: Titik (penanda posisi), Garis (penghubung), dan Sudut (pertemuan dua garis).",
      "Batasnya disebut sisi (bisa berupa garis lurus atau lengkung).",
    ],
  },
  {
    type: "ciri",
    title: "Ciri-Ciri Umum",
    content:
      "Bangun datar memiliki karakteristik khusus yang membedakannya dengan bangun ruang:",
    details: [
      "Bersifat dua dimensi (hanya panjang dan lebar).",
      "Tidak bisa menampung isi karena tidak bervolume.",
      "Memiliki Luas (ukuran permukaan) dan Keliling (panjang batas luar).",
      "Tersusun dari sisi dan sudut (kecuali lingkaran).",
    ],
  },
  {
    type: "unsur",
    title: "Unsur & Manfaat",
    content:
      "Setiap bangun datar memiliki komponen pembentuk dan kegunaan dalam kehidupan:",
    details: [
      "Sisi: Garis yang membatasi bangun.",
      "Sudut & Titik Sudut: Pertemuan dua sisi.",
      "Diagonal: Garis penghubung titik sudut tidak bersebelahan.",
      "Manfaat: Arsitektur, desain UI (teknologi), dan kehidupan sehari-hari.",
    ],
  },
  {
    name: "Persegi",
    def: "Bangun datar yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku.",
    ciri: [
      "Semua sisi sama panjang",
      "Semua sudut 90°",
      "2 diagonal sama panjang & tegak lurus",
    ],
    unsur: "Sisi: 4, Diagonal: 2, Sudut: 4 (Siku-siku)",
    benda: "Ubin lantai, Papan catur",
  },
  {
    name: "Persegi Panjang",
    def: "Bangun datar dengan 2 pasang sisi sejajar dan sama panjang.",
    ciri: [
      "Sisi berhadapan sama panjang",
      "Sudut semuanya 90°",
      "Diagonal sama panjang",
    ],
    unsur: "Sisi: 4 (2 panjang, 2 lebar), Diagonal: 2, Sudut: 4 (Siku-siku)",
    benda: "Buku, Pintu",
  },
  {
    name: "Segitiga",
    def: "Bangun datar dengan 3 sisi.",
    ciri: [
      "Memiliki 3 sisi",
      "Jumlah sudut = 180°",
      "Jenis: sama sisi, sama kaki, sembarang",
    ],
    unsur: "Sisi: 3, Diagonal: Tidak ada, Sudut: 3",
    benda: "Rambu lalu lintas, Atap rumah",
  },
  {
    name: "Lingkaran",
    def: "Bangun datar yang semua titiknya berjarak sama dari pusat.",
    ciri: [
      "Tidak memiliki sudut",
      "Tidak memiliki sisi lurus",
      "Memiliki jari-jari dan diameter",
    ],
    unsur: "Sisi: 1 (Lengkung), Diagonal: Diameter/Jari-jari, Sudut: Tidak ada",
    benda: "Jam dinding, Roda",
  },
  {
    name: "Jajar Genjang",
    def: "Bangun datar dengan dua pasang sisi sejajar.",
    ciri: [
      "Sisi berhadapan sejajar & sama panjang",
      "Sudut berhadapan sama besar",
      "Diagonal berpotongan",
    ],
    unsur: "Sisi: 4, Diagonal: 2, Sudut: 4",
    benda: "Atap miring, Desain ubin",
  },
  {
    name: "Trapesium",
    def: "Bangun datar dengan satu pasang sisi sejajar.",
    ciri: [
      "Hanya 1 pasang sisi sejajar",
      "Memiliki 4 sisi",
      "Jenis: siku-siku, sama kaki",
    ],
    unsur: "Sisi: 4, Diagonal: Bisa ada, Sudut: 4",
    benda: "Meja trapesium, Tas",
  },
  {
    name: "Belah Ketupat",
    def: "Bangun datar dengan 4 sisi sama panjang.",
    ciri: [
      "Semua sisi sama panjang",
      "Sudut berhadapan sama besar",
      "Diagonal tegak lurus",
    ],
    unsur: "Sisi: 4, Diagonal: 2, Sudut: 4",
    benda: "Layang-layang tradisional, Motif kain",
  },
  {
    name: "Layang-layang",
    def: "Bangun datar dengan dua pasang sisi yang berdekatan sama panjang.",
    ciri: [
      "Sepasang sisi sama panjang",
      "Diagonal tegak lurus",
      "Salah satu diagonal membagi dua sudut",
    ],
    unsur: "Sisi: 4, Diagonal: 2, Sudut: 4",
    benda: "Layang-layang, Ornamen hiasan",
  },
];

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
            className="flex items-center gap-3 bg-orange-500 text-white border-[4px] border-gray-800 px-8 py-3 rounded-2xl font-black uppercase shadow-[6px_6px_0px_#1f2937] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-30"
          >
            Next <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}
