"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Trophy,
  Star,
  Sparkles,
  Target,
  Zap,
  Square,
  Triangle,
  Circle,
  LayoutPanelLeft,
  LogOut,
  ChevronRight,
  Sun,
  Cloud,
  Diamond,
  BookOpen,
  Hexagon,
} from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { useRouter } from "next/navigation";
import { decorations } from "@/libs/decorations";
import { materi } from "@/libs/materi";

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Ujang");

  useEffect(() => {
    fetch("/api/student")
      .then((res) => res.json())
      .then((data) => {
        if (data.fullName) setUserName(data.fullName.split(" ")[0]);
      })
      .catch(() => console.log("Gagal ambil data"));
  }, []);

  // Variabel kategori diganti menjadi materi dengan konten Bangun Datar

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/");
  };

  return (
    <LayoutWrapper className="bg-yellow-50/30 overflow-y-auto block p-0!">
      {/* Dekorasi Latar Belakang */}
      {decorations.map((deco, index) => (
        <Decoration
          key={`deco-${index}`}
          icon={deco.icon}
          className={deco.className}
          animate={deco.animate}
          transition={deco.transition}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* --- HEADER & HERO --- */}
        <section className="mb-12">
          <Card className="p-8 md:p-12 border-b-8 border-brand-muted relative overflow-hidden bg-white">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 text-sm font-black text-brand-primary bg-indigo-50 rounded-full border-2 border-brand-primary/10 uppercase">
                <Sparkles size={18} className="animate-pulse" />
                Halo, {userName}!
              </div>
              <button
                onClick={handleLogout}
                className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 border-2 border-red-100 transition-all shadow-sm"
              >
                <LogOut size={24} />
              </button>
            </div>

            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] mb-6 uppercase tracking-tighter">
                SIAP JADI <br />
                <span className="text-brand-primary">JAGOAN GEOMETRI?</span>
              </h1>
              <p className="text-xl text-gray-500 font-bold max-w-lg mb-8 italic">
                "Pilih petualanganmu dan temukan rahasia di setiap sudut bangun
                datar! 🌟"
              </p>

              <div className="bg-orange-100 px-6 py-4 rounded-3xl flex items-center gap-3 border-2 border-orange-200 w-fit shadow-sm">
                <Trophy className="text-orange-500 w-8 h-8" />
                <span className="font-black text-orange-700 text-2xl">
                  0 Skor
                </span>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 text-brand-primary/5 rotate-12 hidden lg:block">
              <Rocket size={300} />
            </div>
          </Card>
        </section>

        {/* --- GRID MATERI --- */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-brand-primary p-3 rounded-2xl text-white shadow-lg">
              <Rocket size={28} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Materi Bangun Datar
            </h2>
          </div>

          {/* Perbaikan Grid agar tidak rusak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {materi.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => router.push(item.path)}
                className="cursor-pointer group"
              >
                <Card className="p-0 overflow-hidden border-none shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white h-full flex flex-col rounded-[32px]">
                  {/* Bagian Visual Atas */}
                  <div className="relative h-44 flex items-center justify-center overflow-hidden">
                    {/* Lingkaran Dekoratif Halus (Background) */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className={`absolute w-32 h-32 ${item.color} opacity-10 rounded-full blur-2xl`}
                    />

                    {/* Ikon dengan Animasi Mengapung */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`${item.accent} drop-shadow-sm z-10`}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Bagian Konten */}
                  <div className="px-6 pb-8 flex flex-col flex-1">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-400 mb-6 leading-relaxed">
                        {item.info}
                      </p>
                    </div>

                    {/* Tombol Interaktif dengan Framer Motion */}
                    <Button
                      variant="secondary"
                      className={`mt-auto flex items-center justify-between px-5 py-3 rounded-2xl ${item.color} bg-opacity-10 ${item.accent} font-bold text-sm`}
                    >
                      MULAI KUIS
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- BANNER BAWAH --- */}
        <section className="mt-20">
          <Card className="bg-brand-primary p-10 md:p-16 rounded-[40px] border-none shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left text-black">
                <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight uppercase">
                  Selesaikan Misi! 🏆
                </h2>
                <p className="text-blue-500 text-lg font-bold italic">
                  Dapatkan bintang di setiap materi dan jadilah juara kelas hari
                  ini.
                </p>
              </div>
              <Button
                variant="secondary"
                className="text-2xl px-12 py-6 shadow-[0_10px_0_#b45309] hover:translate-y-1 transition-all"
              >
                MULAI KUIS
              </Button>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </Card>
        </section>
      </div>
    </LayoutWrapper>
  );
}
