"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import { LayoutWrapper } from "@/components/AnimatedBackgroud";

export default function VideoPage() {
  const router = useRouter();

  return (
    <LayoutWrapper className="bg-yellow-50/30">
      <div className="h-full w-full max-w-3xl flex flex-col p-6 relative space-y-6">
        {/* Tombol Kembali & Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-white border-[3px] border-gray-800 p-2 rounded-xl shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937] p-3">
            <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tight">
              Materi Video
            </h1>
          </div>
        </div>

        {/* Container Video */}

        <div className="w-full  mx-auto bg-white border-4 border-gray-800 rounded-2xl shadow-[8px_8px_0px_#1f2937] overflow-hidden flex flex-col">
          {/* Header Video */}
          <div className="bg-red-500 p-3 border-b-4 border-gray-800 flex items-center gap-2">
            <Play size={20} color="white" fill="white" />
            <span className="text-white font-bold uppercase text-sm">
              Now Playing
            </span>
          </div>

          {/* Wrapper Video dengan Aspect Ratio 16:9 */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <video
              controls
              className="w-full h-full object-contain"
              poster="/thumbnail.png"
            >
              <source src="/video.mp4" type="video/mp4" />
              Browser Anda tidak mendukung tag video.
            </video>
          </div>
        </div>

        {/* Deskripsi Tambahan (Opsional) */}
        <div className="bg-blue-100 border-[3px] border-gray-800 rounded-xl p-4">
          <p className="font-bold text-gray-800 text-sm md:text-base">
            Simak video penjelasan di atas untuk memahami materi lebih dalam.
          </p>
        </div>
      </div>
    </LayoutWrapper>
  );
}
