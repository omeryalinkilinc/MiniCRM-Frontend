import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const url = request.nextUrl.pathname;

  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  if (url.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("unauthorized", request.url));
  }

  if (url.startsWith("/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("unauthorized", request.url));
  }

  return NextResponse.next();
}
