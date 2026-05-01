"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  GraduationCap,
  School,
} from "lucide-react";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { motion } from "framer-motion";
import { decorations } from "@/libs/decorations";

export default function ProfilePage() {
  const router = useRouter();

  const profileData = [
    {
      label: "Nama Lengkap Penulis",
      value: "Fitriana Dian Setyanto", //
      icon: <User className="text-white" size={18} />,
      color: "bg-blue-500",
    },
    {
      label: "NIM",
      value: "34302200097", //
      icon: <GraduationCap className="text-white" size={18} />,
      color: "bg-purple-500",
    },
    {
      label: "Alamat",
      value:
        "Bitaran Raya RT 02 / RW 03 Kelurahan Banjardowo, Kecamatan Genuk, Kota Semarang", //
      icon: <MapPin className="text-white" size={18} />,
      color: "bg-green-500",
    },
    {
      label: "Email",
      value: "fitrids6122@gmail.com", //
      icon: <Mail className="text-white" size={18} />,
      color: "bg-red-500",
    },
    {
      label: "Nama Universitas",
      value: "Universitas Islam Sultan Agung Semarang", //
      icon: <School className="text-white" size={18} />,
      color: "bg-teal-500",
    },
  ];

  return (
    // Background utama yang memenuhi seluruh layar
    <LayoutWrapper className="bg-yellow-50/30 w-full h-full">
      {decorations.map((decorations, idx) => (
        <Decoration
          key={idx}
          icon={decorations.icon}
          className={decorations.className}
          animate={decorations.animate}
          transition={decorations.transition}
        />
      ))}
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        {/* Container Landscape Terkunci (16:9) */}
        <div className="w-full max-w-250 aspect-video max-h-screen relative shadow-2xl overflow-hidden bg-white border-4 border-gray-800 rounded-3xl">
          <div className="h-full w-full flex flex-col p-4 md:p-6 relative space-y-4">
            {/* Header Profil */}
            <div className="flex items-center gap-4 flex-none">
              <button
                onClick={() => router.back()}
                className="bg-white border-[3px] border-gray-800 p-2 rounded-xl shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937] p-2">
                <h1 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-tighter text-center italic">
                  Profil Perancang
                </h1>
              </div>
            </div>

            {/* Konten Utama - Grid 2 Kolom untuk menghemat ruang vertikal */}
            <div className="flex-1 flex gap-6 items-start overflow-hidden pt-2">
              {/* Sisi Kiri: Avatar & Pembimbing */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-1/3 flex flex-col items-center space-y-4"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-400 border-4 border-gray-800 rounded-full flex items-center justify-center shadow-[4px_4px_0px_#1f2937]">
                  <User size={60} className="text-white" />
                </div>

                <div className="w-full bg-yellow-200 border-[3px] border-gray-800 p-2 rounded-xl shadow-[2px_2px_0px_#1f2937] text-center">
                  <p className="text-[9px] font-black uppercase text-gray-500 italic">
                    Dosen Pembimbing
                  </p>
                  <p className="text-[10px] md:text-xs font-bold text-gray-800">
                    Dr. Muhamad Afandi, S.Pd., M.Pd., M.H. {/* */}
                  </p>
                </div>
              </motion.div>

              {/* Sisi Kanan: Detail Informasi */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 bg-white/50 border-4 border-gray-800 rounded-2xl p-4 shadow-[6px_6px_0px_#1f2937] overflow-y-auto custom-scrollbar h-full"
              >
                <div className="space-y-3">
                  {profileData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 border-b-2 border-gray-100 pb-2 last:border-0"
                    >
                      <div
                        className={`${item.color} w-8 h-8 rounded-lg border-2 border-gray-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1f2937]`}
                      >
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[8px] font-black uppercase text-gray-400 leading-none mb-1">
                          {item.label} {/* */}
                        </p>
                        <p className="text-xs md:text-sm font-bold text-gray-800 truncate lg:whitespace-normal leading-tight">
                          {item.value} {/* */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-400 font-bold text-[9px] uppercase tracking-widest flex-none pt-2 italic">
              © 2026 Media Pembelajaran Interaktif
            </p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
