"use client";

import { useEffect } from "react";

export default function PwaRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("SW Terdaftar di scope:", reg.scope))
          .catch((err) => console.error("SW Gagal Terdaftar:", err));
      });
    }
  }, []);

  return null;
}
