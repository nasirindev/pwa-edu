"use client";

import { motion } from "framer-motion";
import { Rocket, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Loading() {
  // Simpan posisi bintang di state
  const [stars, setStars] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    // Generate posisi hanya di sisi client
    const generatedStars = [...Array(5)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-brand-primary overflow-hidden"
    >
      {/* Render bintang hanya jika sudah ada di state (Client Side) */}
      {stars.map((pos, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
          }}
        >
          <Star className="text-white/20" size={20} fill="currentColor" />
        </motion.div>
      ))}

      <div className="relative">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Rocket className="w-32 h-32 text-brand-secondary drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 1.5, 1] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-10 bg-linear-to-t from-transparent to-brand-secondary rounded-full blur-sm"
        />
      </div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-12 text-3xl font-black text-white tracking-widest text-center"
      >
        MENYIAPKAN <br />
        <span className="text-brand-secondary text-xl font-bold">
          DUNIA BELAJAR...
        </span>
      </motion.h1>

      <div className="mt-8 flex gap-3">
        <div className="w-4 h-4 bg-brand-secondary rounded-full animate-bounce shadow-lg" />
        <div className="w-4 h-4 bg-brand-secondary rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg" />
        <div className="w-4 h-4 bg-brand-secondary rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg" />
      </div>
    </motion.div>
  );
}
