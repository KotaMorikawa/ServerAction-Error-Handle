import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth/auth-utils";

// 保護されたルートのパターン（認証が必要なルート）
const protectedRoutes = ["/dashboard"];
// 未認証ユーザーのみがアクセスできるルート
const authRoutes = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionToken = request.cookies.get("session")?.value;

  // セッショントークンが存在する場合はユーザー情報を検証
  const user = sessionToken ? await verifySessionToken(sessionToken) : null;

  // 保護されたルートに未認証ユーザーがアクセスした場合
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !user) {
    // リダイレクト元のURLをクエリパラメータとして追加
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", encodeURIComponent(request.url));
    return NextResponse.redirect(url);
  }

  // 認証済みユーザーが認証ページにアクセスした場合
  if (authRoutes.some((route) => pathname.startsWith(route)) && user) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// マッチャーの設定（どのパスに対してミドルウェアを実行するか）
export const config = {
  matcher: [
    /*
     * 以下のルートでミドルウェアを実行
     * - ダッシュボード（認証が必要）
     * - サインイン（未認証時のみアクセス可能）
     * - サインアップ（未認証時のみアクセス可能）
     */
    "/dashboard/:path*",
    "/signin",
    "/signup",
  ],
};
