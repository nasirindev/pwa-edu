import {
  Circle,
  Diamond,
  LayoutPanelLeft,
  Square,
  Triangle,
} from "lucide-react";

export const materi = [
  {
    title: "Persegi",
    icon: <Square size={100} />,
    color: "bg-blue-500",
    accent: "text-blue-500",
    info: "4 sisi sama panjang & 4 sudut siku-siku",
    path: "/materi/persegi",
  },
  {
    title: "Persegi Panjang",
    icon: <LayoutPanelLeft size={100} />,
    color: "bg-indigo-500",
    accent: "text-indigo-500",
    info: "Sisi berhadapan sama panjang",
    path: "/materi/persegi-panjang",
  },
  {
    title: "Segitiga",
    icon: <Triangle size={100} />,
    color: "bg-emerald-500",
    accent: "text-emerald-500",
    info: "Bangun datar dengan 3 sisi hebat",
    path: "/materi/segitiga",
  },
  {
    title: "Lingkaran",
    icon: <Circle size={100} />,
    color: "bg-rose-500",
    accent: "text-rose-500",
    info: "Hanya punya satu sisi melengkung",
    path: "/materi/lingkaran",
  },
  {
    title: "Jajar Genjang",
    icon: <LayoutPanelLeft className="rotate-15" size={100} />, // Improvisasi ikon
    color: "bg-orange-500",
    accent: "text-orange-500",
    info: "Sisi berhadapan sejajar & sama panjang",
    path: "/materi/jajar-genjang",
  },
  {
    title: "Trapesium",
    icon: <LayoutPanelLeft className="clip-path-trapesium" size={100} />, // Bisa gunakan icon custom atau transform
    color: "bg-amber-500",
    accent: "text-amber-500",
    info: "Punya sepasang sisi sejajar",
    path: "/materi/trapesium",
  },
  {
    title: "Belah Ketupat",
    icon: <Diamond size={100} />,
    color: "bg-purple-500",
    accent: "text-purple-500",
    info: "4 sisi sama panjang, mirip layang-layang",
    path: "/materi/belah-ketupat",
  },
  {
    title: "Layang-layang",
    icon: <Diamond className="scale-y-125" size={100} />, // Modifikasi agar lebih lonjong
    color: "bg-cyan-500",
    accent: "text-cyan-500",
    info: "Punya 2 pasang sisi sama panjang",
    path: "/materi/layang-layang",
  },
];
