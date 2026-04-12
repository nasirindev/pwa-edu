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
    initial={{ opacity: 0, scale: 0.9 }} // Gunakan scale agar lebih aman daripada Y offset besar
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", duration: 0.5 }}
    className={`
      relative z-10 w-full ${maxWidth} 
      /* Hapus atau perbesar max-h untuk testing */
      bg-white flex flex-col 
      rounded-[40px] shadow-2xl border-b-8 border-brand-muted 
      ${className}
    `}
  >
    <div
      className={`overflow-x-hidden no-scrollbar ${noPadding ? "" : "p-4 md:p-6"}`}
    >
      {children}
    </div>
  </motion.div>
);
