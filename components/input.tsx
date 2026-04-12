"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  error?: string; // Tambahkan prop error
}

// Gunakan forwardRef agar RHF bisa mengakses element input asli
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, ...props }, ref) => (
    <motion.div whileHover={{ x: 5 }} className="space-y-2">
      <label className="text-sm font-black text-gray-700 ml-2 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        <div
          className={`absolute left-4 top-3.5 h-5 w-5 transition-colors ${
            error
              ? "text-red-400"
              : "text-gray-400 group-focus-within:text-brand-primary"
          }`}
        >
          {icon}
        </div>
        <input
          {...props}
          ref={ref} // Pasang ref di sini
          className={`w-full rounded-2xl border-4 bg-gray-50 py-4 pl-12 pr-4 outline-none transition-all font-bold text-gray-700 ${
            error
              ? "border-red-400 focus:border-red-500 bg-red-50/30"
              : "border-brand-muted focus:border-brand-primary focus:bg-white"
          }`}
        />
      </div>

      {/* Animasi Pesan Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs font-black text-red-500 ml-3 uppercase tracking-tight"
          >
            ⚠️ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  ),
);
