import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Halaman yang bebas diakses siapapun (Public)
const PUBLIC_ROUTES = ["/"];

// 2. Halaman yang HANYA boleh diakses jika BELUM login (Guest Only)
// Jika sudah login, akses ke sini akan dilempar ke /home
const GUEST_ONLY_ROUTES = ["/auth"];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // Cek file statis
  const isPublicFile = pathname.match(/\.(.*)$/);
  if (isPublicFile) return NextResponse.next();

  const isGuestRoute = GUEST_ONLY_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // LOGIKA A: Jika BELUM login
  // Mencoba akses halaman selain "/" dan "/auth" -> Tendang ke "/"
  if (!token && !isGuestRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // LOGIKA B: Jika SUDAH login
  // Mencoba akses halaman "/auth" -> Tendang ke "/home"
  if (token && isGuestRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
