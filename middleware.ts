import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

// 保護されたルートのパターン
const protectedRoutes = ["/dashboard"];
// 未認証ユーザーのみがアクセスできるルート
const authRoutes = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionToken = request.cookies.get("session")?.value;
  const user = sessionToken ? await verifySessionToken(sessionToken) : null;

  // 保護されたルートに未認証ユーザーがアクセスした場合
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !user) {
    const url = new URL("/signin", request.url);
    return NextResponse.redirect(url);
  }

  // 認証済みユーザーが認証ページにアクセスした場合
  if (authRoutes.some((route) => pathname.startsWith(route)) && user) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 静的な値にする
export const config = {
  matcher: ["/dashboard", "/signin", "/signup"],
};
