"use client";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  noPadding?: boolean;
}

export const Card = ({
  children,
  maxWidth = "max-w-5xl",
  className = "",
  noPadding = false,
}: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className={`relative z-10 w-full ${maxWidth} max-h-[95vh] bg-white flex flex-col rounded-[40px] shadow-2xl border-b-8 border-brand-muted ${className}`}
  >
    {/* overflow-x-hidden hanya di level scroll container agar h-scroll hilang 
        tapi overflow-visible di parent tetap bisa menampilkan bintang melayang */}
    <div
      className={`overflow-y-auto overflow-x-hidden no-scrollbar rounded-[40px] ${noPadding ? "" : "p-4 md:p-6"}`}
    >
      {children}
    </div>
  </motion.div>
);
