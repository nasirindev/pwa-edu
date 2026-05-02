"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Star, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { decorations } from "@/libs/decorations";

export default function TujuanPage() {
  const router = useRouter();

  const objectives = [
    {
      text: "Peserta didik dapat menerima pemahaman materi dengan  menarik dan komunikatif, sehingga dapat  meningkatkan keaktifan pembelajaran didalam kelas.",
      icon: <Star className="text-yellow-500" />,
    },
    {
      text: "b)	Sebagai pemicu dalam meningkatkan semangat belajar peserta didik, sehingga mampu meningkatkan kemampuan berpikir kritis peserta didik pada mata pelajaran matematika.",
      icon: <CheckCircle2 className="text-green-500" />,
    },
  ];

  return (
    <LayoutWrapper className="bg-blue-50/30">
      {/* Dekorasi Latar Belakang */}
      {decorations.map((decor, idx) => (
        <Decoration
          key={idx}
          icon={decor.icon}
          className={decor.className}
          animate={decor.animate}
          transition={decor.transition}
        />
      ))}

      <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto p-4 space-y-4">
        {/* Tombol Kembali & Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-white border-[3px] border-gray-800 p-2 rounded-xl shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937] p-3 text-center">
            <h1 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-tight">
              Tujuan
            </h1>
          </div>
        </div>

        {/* Konten Utama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-gray-800"
        >
          <div className="flex flex-col gap-6">
            <p className="text-lg font-medium text-gray-700 leading-relaxed text-center italic">
              "Melalui aplikasi ini, diharapkan teman-teman semua dapat mencapai
              hal berikut:"
            </p>

            <div className="space-y-4">
              {objectives.map((obj, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border-2 border-blue-100 shadow-sm"
                >
                  <div className="mt-1">{obj.icon}</div>
                  <p className="font-bold text-blue-900 leading-tight">
                    {obj.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Motivasi Bawah */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.8 }}
          className="mt-8 bg-yellow-400 p-4 rounded-2xl shadow-lg transform -rotate-1 italic text-center font-black text-blue-900"
        >
          Ayo Semangat Belajar, Jadi Juara! 🏆
        </motion.div>
      </div>
    </LayoutWrapper>
  );
}
