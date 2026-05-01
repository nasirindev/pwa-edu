"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  BookOpen,
  HelpCircle,
  PlayCircle,
  User,
  PenTool,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { decorations } from "@/libs/decorations";

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

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/");
  };

  const menuItems = [
    {
      title: "Tujuan",
      icon: <Trophy />,
      path: "/kikd",
      color: "bg-blue-500",
    },
    {
      title: "PETUNJUK",
      icon: <HelpCircle />,
      path: "/petunjuk",
      color: "bg-green-500",
    },
    {
      title: "LATIHAN SOAL",
      icon: <PenTool />,
      path: "/latihan",
      color: "bg-orange-500",
    },
    {
      title: "VIDEO",
      icon: <PlayCircle />,
      path: "/video",
      color: "bg-red-500",
    },
    {
      title: "MATERI",
      icon: <BookOpen />,
      path: "/materi",
      color: "bg-purple-500",
    },
    { title: "PROFIL", icon: <User />, path: "/profile", color: "bg-teal-500" },
  ];

  return (
    <LayoutWrapper className="bg-yellow-50/30">
      {decorations.map((decorations, idx) => (
        <Decoration
          key={idx}
          icon={decorations.icon}
          className={decorations.className}
          animate={decorations.animate}
          transition={decorations.transition}
        />
      ))}
      {/* Container utama dengan padding kecil agar muat di layar HP/Tablet */}
      <div className="h-full w-full flex flex-col p-6 relative lg:space-y-6 space-y-0">
        <div className="min-h-[10vh]">
          <div className="h-full bg-white border-[3px] md:border-4 border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937] flex items-center justify-center p-2 md:p-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-800 tracking-widest md:tracking-[0.2em] uppercase transform">
              Menu
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-2 md:gap-4 flex-3 h-full min-h-[10vh]">
          {menuItems.map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(item.path)}
              className="bg-white border-[3px] md:border-4 border-gray-800 rounded-xl p-2 md:p-4 flex items-center gap-2 md:gap-4 shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all overflow-hidden"
            >
              <div
                className={`${item.color} p-1.5 md:p-2 rounded-lg text-white shrink-0`}
              >
                {/* Ukuran icon menyesuaikan layar */}
                {React.cloneElement(item.icon as React.ReactElement<any>, {
                  size: 20,
                })}
              </div>
              <span className="font-black text-gray-800 uppercase tracking-tighter text-[10px] sm:text-xs md:text-lg truncate">
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>
        {/* --- FOOTER / DECORATION --- */}
        <div className="absolute bottom-2 right-2 opacity-10 pointer-events-none hidden md:block">
          <Trophy size={80} />
        </div>
      </div>
    </LayoutWrapper>
  );
}
