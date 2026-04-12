import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import PwaRegistration from "@/components/PwaRegistration";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  manifest: "/manifest.json", // WAJIB ADA untuk PWA
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  title: "Media Belajar SD - Pintar Bersama",
  description: "Aplikasi belajar interaktif seru untuk anak sekolah dasar",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "BelajarSD" },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col overflow-x-hidden">
        <PwaRegistration />
        {children}
      </body>
    </html>
  );
}
