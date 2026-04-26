import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  // 1. Ambil token dari cookie
  const token = request.cookies.get("auth-token")?.value;

  // 2. Ambil path yang sedang diakses
  const { pathname } = request.nextUrl;

  // 3. Tentukan halaman publik/root
  // Di sini kita anggap "/" adalah halaman login atau landing page utama
  const isRootPage = pathname === "/";
  const isPublicFile = pathname.match(/\.(.*)$/); // Hindari blocking file statis (images, dsb)

  // 4. Logika Proteksi:

  // A. Jika BELUM login dan mencoba mengakses halaman selain "/" atau file statis
  if (!token && !isRootPage && !isPublicFile) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // B. Jika SUDAH login dan mencoba mengakses halaman "/" (halaman awal/login)
  if (token && isRootPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// 5. Konfigurasi Matcher
export const config = {
  /*
   * Match semua rute kecuali rute internal Next.js dan API
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
