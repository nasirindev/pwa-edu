"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Rocket, Trophy, Star, PlayCircle } from "lucide-react";

export default function HomePage() {
  const categories = [
    {
      title: "Matematika",
      icon: <Rocket className="w-8 h-8" />,
      color: "bg-brand-accent", // Menggunakan Oranye kustom
      count: "12 Materi",
    },
    {
      title: "Bahasa Indonesia",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-brand-info", // Menggunakan Biru kustom
      count: "8 Materi",
    },
    {
      title: "Sains & IPA",
      icon: <Star className="w-8 h-8" />,
      color: "bg-brand-success", // Menggunakan Hijau kustom
      count: "10 Materi",
    },
    {
      title: "Kuis Seru",
      icon: <Trophy className="w-8 h-8" />,
      color: "bg-purple-500",
      count: "15 Kuis",
    },
  ];

  useEffect(() => {
    // Cek apakah browser mendukung service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js") // Mengambil file dari folder public
          .then((registration) => {
            console.log("SW terdaftar dengan scope:", registration.scope);
          })
          .catch((err) => {
            console.log("SW gagal didaftarkan:", err);
          });
      });
    }
  }, []);

  return (
    <main className="flex-1 bg-yellow-50/30">
      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-12 overflow-hidden bg-white rounded-b-[40px] shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-brand-primary bg-indigo-50 rounded-full uppercase tracking-wider">
              Selamat Datang, Sobat Pintar! 👋
            </span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
              Belajar Jadi{" "}
              <span className="text-brand-primary">Lebih Seru</span> &
              Berpetualang!
            </h1>
            <p className="mb-10 text-lg text-gray-600 md:text-xl">
              Pilih materi favoritmu dan kumpulkan bintang sebanyak-banyaknya
              hari ini.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="btn-bounce flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all bg-brand-primary rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                <PlayCircle className="w-6 h-6" />
                Mulai Belajar
              </button>
              <button className="btn-bounce flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-brand-primary transition-all bg-white border-2 border-brand-muted rounded-2xl hover:bg-brand-muted">
                Lihat Ranking
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Rocket className="w-32 h-32 text-brand-primary rotate-12" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-10">
          <Star className="w-24 h-24 text-brand-secondary -rotate-12" />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl px-6 py-16 mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Pilih Petualanganmu
          </h2>
          <button className="text-sm font-bold text-brand-primary hover:underline">
            Lihat Semua
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-6 transition-all bg-white border-b-4 border-brand-muted cursor-pointer rounded-3xl hover:border-brand-primary shadow-sm"
            >
              <div
                className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
              >
                {item.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-gray-500">{item.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Section / Gamification */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl p-8 mx-auto text-white bg-brand-primary md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-4 text-3xl font-bold">
                Siap Jadi Juara Kelas? 🏆
              </h2>
              <p className="text-indigo-100 md:text-lg">
                Selesaikan misi harian, jawab kuis dengan benar, dan dapatkan
                lencana eksklusif untuk profilmu!
              </p>
            </div>
            <button className="btn-bounce px-8 py-4 text-lg font-bold text-brand-primary bg-brand-secondary rounded-2xl hover:bg-yellow-300 transition-colors shadow-md">
              Cek Misi Harian
            </button>
          </div>
          {/* Efek Lingkaran Dekorasi */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-500 rounded-full opacity-50" />
        </div>
      </section>
    </main>
  );
}
