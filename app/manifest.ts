import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Media Belajar SD",
    short_name: "BelajarSD",
    description: "Aplikasi belajar seru untuk anak SD",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      { src: "/edu-icon.png", sizes: "192x192", type: "image/png" },
      { src: "/edu-icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
