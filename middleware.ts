import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  // Token yoksa login'e yönlendir
  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Admin route'una admin olmayan girerse unauthorized'a yönlendir
  if (path.startsWith("/admin") && role !== "admin") {
    const unauthorizedUrl = request.nextUrl.clone();
    unauthorizedUrl.pathname = "/unauthorized";
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Customer route'una customer olmayan girerse unauthorized'a yönlendir
  if (path.startsWith("/customer") && role !== "customer") {
    const unauthorizedUrl = request.nextUrl.clone();
    unauthorizedUrl.pathname = "/unauthorized";
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Her şey uygunsa devam et
  return NextResponse.next();
}

// Sadece belirli route'larda çalışsın
export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};
