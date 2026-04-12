"use client";
import { motion, MotionConfig } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DecorationProps {
  icon: React.ReactNode;
  className: string;
  animate?: any;
  transition?: any;
}

export const Decoration = ({
  icon,
  className,
  animate,
  transition,
}: DecorationProps) => (
  <motion.div
    animate={animate || { y: [0, -20, 0], rotate: 360 }}
    transition={transition || { duration: 5, repeat: Infinity }}
    className={`absolute z-0 pointer-events-none opacity-20 ${className}`}
  >
    {icon}
  </motion.div>
);

export const LayoutWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <MotionConfig reducedMotion="never">
    <main
      className={`
      relative min-h-dvh w-full 
      flex items-center justify-center 
      p-4 md:p-8 overflow-hidden ${className}
    `}
    >
      {children}
    </main>
  </MotionConfig>
);
