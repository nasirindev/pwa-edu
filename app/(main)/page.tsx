"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Rocket,
  Trophy,
  Star,
  PlayCircle,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Decoration } from "@/components/AnimatedBackgroud";

export default function HomePage() {
  const categories = [
    {
      title: "Matematika",
      icon: <Rocket className="w-8 h-8" />,
      color: "bg-brand-accent",
      count: "12 Materi",
      accent: "text-orange-600",
    },
    {
      title: "Bahasa Indonesia",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-brand-info",
      count: "8 Materi",
      accent: "text-blue-600",
    },
    {
      title: "Sains & IPA",
      icon: <Star className="w-8 h-8" />,
      color: "bg-brand-success",
      count: "10 Materi",
      accent: "text-green-600",
    },
    {
      title: "Kuis Seru",
      icon: <Trophy className="w-8 h-8" />,
      color: "bg-purple-500",
      count: "15 Kuis",
      accent: "text-purple-700",
    },
  ];

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("SW terdaftar:", reg.scope))
          .catch((err) => console.log("SW gagal:", err));
      });
    }
  }, []);

  return (
    // Kita gunakan overflow-y-auto agar dashboard bisa di-scroll jika materi banyak
    <main className="flex-1 bg-yellow-50/30 min-h-screen overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative px-6 pt-12 pb-10 overflow-hidden bg-white rounded-b-[60px] shadow-sm border-b-4 border-brand-muted">
        {/* Dekorasi Melayang Spesifik Dashboard */}
        <Decoration
          icon={<Target size={60} />}
          className="top-10 left-[10%] text-brand-primary/10"
        />
        <Decoration
          icon={<Zap size={40} />}
          className="bottom-10 right-[15%] text-brand-secondary/20"
          animate={{ scale: [1, 1.2, 1] }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-black text-brand-primary bg-indigo-50 rounded-full uppercase tracking-widest border-2 border-brand-primary/10">
              <Sparkles size={16} className="animate-pulse" />
              Selamat Datang, Sobat Pintar!
              <Sparkles size={16} className="animate-pulse" />
            </div>

            <h1 className="mb-6 text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-none">
              BELAJAR JADI <br />
              <span className="text-brand-primary">LEBIH SERU</span>
            </h1>

            <p className="mb-10 text-lg text-gray-500 font-bold max-w-xl mx-auto italic">
              "Pilih petualanganmu hari ini dan kumpulkan semua bintang
              keberuntungan!" 🌟
            </p>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Button
                variant="primary"
                className="px-10 py-5 text-xl"
                icon={<PlayCircle size={28} />}
              >
                Mulai Belajar
              </Button>
              <Button variant="secondary" className="px-10 py-5 text-xl">
                Lihat Ranking
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CATEGORIES GRID --- */}
      <section className="max-w-6xl px-6 py-16 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-brand-primary p-3 rounded-2xl text-white shadow-lg">
              <Rocket size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
              Pilih Petualangan
            </h2>
          </div>
          <button className="text-sm font-black text-brand-primary hover:scale-105 transition-transform uppercase tracking-wider">
            Lihat Semua →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group cursor-pointer"
            >
              {/* Gunakan komponen Card yang direfaktor */}
              <Card className="p-8 h-full border-brand-muted hover:border-brand-primary transition-colors">
                <div
                  className={`w-20 h-20 ${item.color} rounded-[24px] flex items-center justify-center text-white mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:rotate-6 transition-transform`}
                >
                  {item.icon}
                </div>

                <h3
                  className={`mb-2 text-2xl font-black leading-tight ${item.accent}`}
                >
                  {item.title}
                </h3>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-brand-primary transition-colors" />
                  <p className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    {item.count}
                  </p>
                </div>

                {/* Indikator "Play" yang muncul saat hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="mt-6 flex items-center gap-2 text-brand-primary font-bold text-xs"
                >
                  AYO MULAI <ChevronRight size={14} />
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- INFO SECTION (GAMIFICATION) --- */}
      <section className="px-6 pb-20">
        <Card className="max-w-5xl mx-auto bg-brand-primary overflow-hidden border-none shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)]">
          <div className="relative z-10 flex flex-col items-center gap-10 p-10 md:p-16 md:flex-row">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block p-3 bg-white/20 rounded-2xl mb-4 text-brand-secondary">
                <Trophy size={40} className="animate-bounce" />
              </div>
              <h2 className="mb-4 text-4xl font-black text-white leading-tight">
                SIAP JADI JUARA KELAS? 🏆
              </h2>
              <p className="text-indigo-100 text-lg font-medium">
                Selesaikan misi harian, jawab kuis dengan benar, dan dapatkan
                lencana eksklusif untuk profilmu!
              </p>
            </div>

            <div className="shrink-0">
              <Button
                variant="secondary"
                className="text-xl px-12 py-6 shadow-[0_10px_0_#b45309]"
              >
                CEK MISI HARIAN
              </Button>
            </div>
          </div>

          {/* Efek Latar Belakang di dalam Card Juara */}
          <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-5%] w-60 h-60 bg-brand-secondary/20 rounded-full blur-2xl" />
        </Card>
      </section>
    </main>
  );
}

// Komponen Helper Kecil untuk Icon Panah
function ChevronRight({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
