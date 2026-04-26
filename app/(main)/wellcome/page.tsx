"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Box,
  Circle,
  Triangle,
  Sparkles,
  Trophy,
  Rocket,
  Star,
} from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <LayoutWrapper className="bg-yellow-50/30">
      {/* --- DEKORASI LATAR BELAKANG --- */}
      <Decoration
        icon={<Box size={120} strokeWidth={1} />}
        className="top-[10%] left-[8%] text-white/10"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <Decoration
        icon={<Circle size={100} fill="currentColor" />}
        className="bottom-[15%] right-[10%] text-brand-secondary/20"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <Decoration
        icon={<Triangle size={80} strokeWidth={1.5} />}
        className="top-[20%] right-[15%] text-brand-success/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* --- KONTEN UTAMA --- */}
      <Card
        maxWidth="max-w-5xl"
        className="p-6 md:p-10 relative overflow-visible"
      >
        {/* Dekorasi Bintang Melayang di pojok Card */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-5 -right-5 bg-white p-3 rounded-2xl shadow-xl border-4 border-brand-secondary text-brand-secondary z-20"
        >
          <Star fill="currentColor" size={32} />
        </motion.div>

        {/* Header: Logo Section */}
        <div className="flex justify-between items-center mb-10">
          <div className="w-16 h-16 overflow-hidden bg-indigo-50 border-4 border-dashed border-brand-primary/20 rounded-2xl flex items-center justify-center p-1 group hover:border-brand-primary transition-colors">
            <Image
              alt="logo-unisulla"
              src={"/unisula.jpeg"}
              width={100}
              height={100}
              className="w-full h-full rounded-2xl"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="bg-yellow-100 p-4 rounded-full text-brand-secondary shadow-inner"
          >
            <Trophy size={32} />
          </motion.div>

          <div className="w-16 h-16 bg-yellow-50 border-4 border-dashed border-brand-secondary/20 rounded-2xl flex items-center justify-center p-1 group hover:border-brand-secondary transition-colors">
            <Image
              alt="logo-unisulla"
              src={"/fkip.jpeg"}
              width={100}
              height={100}
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>

        {/* Tengah: Judul Utama */}
        <div className="text-center mb-12 flex-1 flex flex-col justify-center">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-none tracking-tighter"
          >
            MEDIA <span className="text-brand-primary">APLIKASI</span> <br />
            <span className="text-brand-secondary drop-shadow-sm">
              BANGUN DATAR
            </span>
          </motion.h1>

          <div className="mt-8 flex items-center justify-center gap-4 bg-gray-50 py-3 px-8 rounded-full w-fit mx-auto border-2 border-gray-100 shadow-sm">
            <Sparkles
              size={22}
              className="text-brand-secondary animate-pulse"
            />
            <p className="text-sm md:text-xl text-gray-600 font-black italic tracking-tight">
              Ayo Jadi Jagoan Geometri! 🚀
            </p>
            <Sparkles
              size={22}
              className="text-brand-secondary animate-pulse"
            />
          </div>
        </div>

        {/* Bawah: Footer & Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t-4 border-dashed border-gray-100">
          <div className="flex items-center gap-5">
            <div className="bg-brand-success/20 p-4 rounded-2xl text-brand-success shadow-sm">
              <Rocket size={40} className="animate-bounce" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black text-gray-800 uppercase leading-none mb-1">
                Siap Mulai?
              </h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                Kumpulkan bintang pertamamu!
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            // onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto text-3xl py-6 px-12"
            icon={<ChevronRight size={36} strokeWidth={4} />}
          >
            GAS POL!
          </Button>
        </div>
      </Card>

      {/* Dekorasi Lantai */}
      <div className="absolute bottom-0 w-full h-32 bg-white/5 -skew-y-2 transform translate-y-16 pointer-events-none" />
    </LayoutWrapper>
  );
}
