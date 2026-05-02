"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ListChecks, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { decorations } from "@/libs/decorations";

export default function PetunjukPage() {
  const router = useRouter();

  return (
    <LayoutWrapper className="bg-green-50/30">
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

      <div className="relative z-10 flex flex-col h-full max-w-3xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="p-2 bg-white border-[3px] border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937]"
          >
            <ArrowLeft className="text-gray-800" size={24} />
          </motion.button>
          <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl py-2 px-6 shadow-[4px_4px_0px_#1f2937]">
            <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase italic">
              Petunjuk Penggunaan
            </h1>
          </div>
        </div>

        {/* Konten Utama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-[3px] border-gray-800 rounded-2xl p-6 shadow-[8px_8px_0px_#1f2937] space-y-6 overflow-y-auto max-h-[75vh]"
        >
          {/* Poin 1 */}
          <div className="flex gap-4">
            <span className="shrink-0 w-8 h-8 bg-blue-500 border-2 border-gray-800 rounded-full flex items-center justify-center font-black text-white shadow-[2px_2px_0px_#1f2937]">
              1
            </span>
            <p className="font-bold text-gray-700 pt-1">
              Pertama tama, bukalah aplikasi media bangun datar
            </p>
          </div>

          {/* Poin 2 */}
          <div className="flex gap-4">
            <span className="shrink-0 w-8 h-8 bg-green-500 border-2 border-gray-800 rounded-full flex items-center justify-center font-black text-white shadow-[2px_2px_0px_#1f2937]">
              2
            </span>
            <p className="font-bold text-gray-700 pt-1">
              Login dengan memasukkan NAMA, KELAS, SEKOLAH
            </p>
          </div>

          {/* Poin 3 */}
          <div className="flex gap-4">
            <span className="shrink-0 w-8 h-8 bg-orange-500 border-2 border-gray-800 rounded-full flex items-center justify-center font-black text-white shadow-[2px_2px_0px_#1f2937]">
              3
            </span>
            <div className="space-y-2 pt-1">
              <p className="font-bold text-gray-700 text-pretty">
                Pada bagian menu terdapat pilihan :
              </p>
              <ul className="space-y-1 ml-2">
                {[
                  "Petunjuk Penggunaan Media Animasi Bangun Datar",
                  "Manfaat Media Animasi Bangun Datar",
                  "Materi Bangun Datar",
                  "Video Pembelajaran",
                  "Latihan soal",
                  "Profil Perancang",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 font-bold text-gray-600"
                  >
                    <span className="text-orange-600 font-black">Ø</span> {item}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-gray-700 italic mt-2 text-sm bg-yellow-100 p-2 rounded-lg border-2 border-dashed border-yellow-400">
                Kemudian peserta didik dapat memilih secara urut / boleh memilih
                sesuai keinginannya
              </p>
            </div>
          </div>

          {/* Poin 4 */}
          <div className="flex gap-4">
            <span className="shrink-0 w-8 h-8 bg-purple-500 border-2 border-gray-800 rounded-full flex items-center justify-center font-black text-white shadow-[2px_2px_0px_#1f2937]">
              4
            </span>
            <p className="font-bold text-gray-700 pt-1 leading-relaxed">
              Pada bagian petunjuk berisi bagaimana cara penggunaan dari media
              animasi bangun datar, pada bagian manfaat apa saja manfaat dari
              media animasi bangun datar, pada bagian materi berisi materi rinci
              bangun datar, pada bagian video berisi video animasi kartun yang
              menjelaskan materi bangun datar, pada bagian latihan soal berisi
              latihan soal-soal dari penjelasan materi bangun datar sebelumnya,
              pada bagian profil perancang berisi nama, NIM, alamat, email, nama
              universitas, dosen Pembimbing
            </p>
          </div>

          {/* Poin 5 */}
          <div className="flex gap-4 pb-4">
            <span className="shrink-0 w-8 h-8 bg-red-500 border-2 border-gray-800 rounded-full flex items-center justify-center font-black text-white shadow-[2px_2px_0px_#1f2937]">
              5
            </span>
            <div className="pt-1">
              <p className="font-bold text-gray-700">
                Jika sudah selesai menggunakan media animasi bangu datar,
                peserta didik dapat keluar dari aplikasi dengan menekan tombol
                yang bertuliskan{" "}
                <span className="text-red-600 font-black underline">
                  “LOGOUT”
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating Icon Decoration */}
        <div className="absolute -bottom-4 -right-4 opacity-20 pointer-events-none">
          <ListChecks size={120} className="text-gray-800 rotate-12" />
        </div>
      </div>
    </LayoutWrapper>
  );
}
