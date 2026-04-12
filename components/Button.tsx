"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  const themes = {
    primary: "bg-brand-primary text-white shadow-[0_8px_0_#3730a3]",
    secondary: "bg-brand-secondary text-brand-primary shadow-[0_8px_0_#d97706]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: variant === "secondary" ? -1 : 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      // transition-all DIHAPUS agar animasi tidak patah-patah
      className={`group flex items-center justify-center gap-4 px-8 py-4 rounded-3xl font-black italic tracking-tighter active:shadow-none active:translate-y-1 overflow-hidden ${themes[variant]} ${className}`}
      {...props}
    >
      <span className="uppercase">{children}</span>
      {icon && (
        <div
          className={`${variant === "primary" ? "bg-white/20" : "bg-brand-primary"} p-2 rounded-xl text-white`}
        >
          {icon}
        </div>
      )}
    </motion.button>
  );
};
