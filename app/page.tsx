"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import {
  Sun,
  Cloud,
  Star,
  LogIn,
  User,
  Lock,
  Sparkles,
  Triangle,
  Circle,
  Zap,
  School,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  console.log("needs ", { errors });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log("needs Data yang dikirim ke Prisma:", data);

      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Diarahkan ke /home agar sesuai dengan logika pengecekan di proxy.ts
        router.push("/home");
      }
    } catch (error) {
      console.error("Gagal simpan data:", error);
    }
  };

  return (
    <LayoutWrapper className="bg-yellow-50/30">
      {/* --- DEKORASI LATAR BELAKANG --- */}
      {/* Matahari Berputar */}
      <Decoration
        icon={<Sun size={100} strokeWidth={1.5} />}
        className="top-[5%] left-[5%] text-brand-secondary opacity-40"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Awan Berjalan */}
      <Decoration
        icon={<Cloud size={120} />}
        className="top-[15%] right-[10%] text-blue-200 opacity-60"
        animate={{ x: [-20, 20, -20], y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Bangun Datar Melayang (Kiri Bawah) */}
      <Decoration
        icon={<Triangle size={60} className="text-brand-success rotate-12" />}
        className="bottom-[15%] left-[10%] opacity-30"
        animate={{ y: [0, -40, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Bangun Datar Melayang (Kanan Bawah) */}
      <Decoration
        icon={
          <Circle size={50} fill="currentColor" className="text-brand-accent" />
        }
        className="bottom-[10%] right-[15%] opacity-20"
        animate={{ scale: [1, 1.5, 1], x: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* --- KARTU LOGIN --- */}
      <Card maxWidth="max-w-md" noPadding className="overflow-visible">
        {/* Header Kartu dengan Animasi */}
        <div className="bg-brand-primary p-10 text-center text-white relative rounded-t-4xl overflow-hidden">
          {/* Efek Sparkles Berkedip */}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-6 text-yellow-300"
          >
            <Sparkles size={24} />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <h2 className="text-4xl font-black mb-1 drop-shadow-md">
              Halo Teman! 👋
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Zap size={16} className="text-brand-secondary fill-current" />
              <p className="text-indigo-100 font-bold tracking-wide text-sm">
                SIAP JADI JUARA HARI INI?
              </p>
              <Zap size={16} className="text-brand-secondary fill-current" />
            </div>
          </motion.div>

          {/* Dekorasi lengkung di bawah header */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10" />
        </div>

        {/* Form Area */}
        <form className="p-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nama Lengkap"
            placeholder="Ketik namamu di sini"
            icon={<User size={22} />}
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          <Input
            label="Nama Sekolah"
            placeholder="Sekolah di mana?"
            icon={<School size={22} />}
            {...register("schoolName")}
            error={errors.schoolName?.message}
          />

          <Input
            label="Kelas"
            placeholder="Contoh: 4 SD"
            icon={<GraduationCap size={22} />}
            {...register("grade")}
            error={errors.grade?.message}
          />

          <div className="pt-4">
            <Button
              type="submit"
              variant="secondary"
              className="w-full text-2xl py-6 rounded-4xl"
              icon={<LogIn size={28} strokeWidth={3} />}
            >
              GAS BELAJAR!
            </Button>
          </div>
        </form>

        {/* Floating Star Decoration (Keluar dari Card) */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-6 -left-6 bg-brand-secondary p-3 rounded-2xl shadow-lg border-4 border-white text-brand-primary z-20"
        >
          <Star fill="currentColor" size={32} />
        </motion.div>
      </Card>
    </LayoutWrapper>
  );
}

const loginSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 huruf ya!"),
  schoolName: z.string().min(2, "Nama sekolah jangan dikosongkan"),
  grade: z.string().min(1, "Pilih kelasmu dulu"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
