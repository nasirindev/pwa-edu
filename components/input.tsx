"use client";
import { motion } from "framer-motion";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
}

export const Input = ({ label, icon, ...props }: InputProps) => (
  <motion.div whileHover={{ x: 5 }} className="space-y-2">
    <label className="text-sm font-black text-gray-700 ml-2 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-primary transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full rounded-2xl border-4 border-brand-muted bg-gray-50 py-4 pl-12 pr-4 outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-gray-700"
      />
    </div>
  </motion.div>
);
