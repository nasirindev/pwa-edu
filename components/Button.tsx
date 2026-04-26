"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "m" | "lg" | "xl"; // Menambahkan params size
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  size = "m", // Default ke 'm'
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  // Definisi tema warna
  const themes = {
    primary: "bg-brand-primary text-white shadow-indigo-900/80",
    secondary: "bg-brand-secondary text-white shadow-amber-700/80",
  };

  // Definisi ukuran (Padding, Text, Gap, dan Shadow Depth)
  const sizes = {
    xs: "px-3 py-1.5 text-xs gap-2 rounded-xl shadow-[0_3px_0_0_rgba(0,0,0,0.3)] active:translate-y-[2px]",
    sm: "px-5 py-2.5 text-sm gap-2.5 rounded-2xl shadow-[0_5px_0_0_rgba(0,0,0,0.3)] active:translate-y-[3px]",
    m: "px-8 py-4 text-base gap-4 rounded-3xl shadow-[0_8px_0_0_rgba(0,0,0,0.3)] active:translate-y-[4px]",
    lg: "px-10 py-5 text-xl gap-5 rounded-[2rem] shadow-[0_10px_0_0_rgba(0,0,0,0.3)] active:translate-y-[5px]",
    xl: "px-12 py-7 text-3xl gap-6 rounded-[2.5rem] shadow-[0_14px_0_0_rgba(0,0,0,0.3)] active:translate-y-[7px]",
  };

  // Mapping warna shadow spesifik (opsional jika ingin hardcode warna shadow seperti sebelumnya)
  const shadowColors = {
    primary: variant === "primary" ? "shadow-[#3730a3]" : "",
    secondary: variant === "secondary" ? "shadow-[#d97706]" : "",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: variant === "secondary" ? -1 : 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`
        group flex items-center justify-center font-black italic tracking-tighter 
        transition-shadow duration-100 active:shadow-none overflow-hidden
        ${themes[variant]} 
        ${sizes[size]} 
        ${shadowColors[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="uppercase leading-none">{children}</span>

      {icon && (
        <div
          className={`
            flex items-center justify-center shrink-0
            ${variant === "primary" ? "bg-white/20" : "bg-black/10"} 
            ${size === "xs" || size === "sm" ? "p-1 rounded-lg" : "p-2 rounded-xl"} 
            text-white
          `}
        >
          {/* Mengatur ukuran icon otomatis berdasarkan size button jika memungkinkan */}
          {icon}
        </div>
      )}
    </motion.button>
  );
};
