"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_TOKEN_NAME, verifySessionToken } from "@/lib/auth/auth-utils";

// セッションCookieの設定
export const setSessionCookie = async (token: string): Promise<void> => {
  const cookieStore = cookies();

  (await cookieStore).set({
    name: SESSION_TOKEN_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // セッションCookieとして設定（ブラウザ終了時に無効化）
    // 特定の有効期限を設定する場合は expires または maxAge を指定
  });
};

// セッションCookieの削除
export const deleteSessionCookie = async (): Promise<void> => {
  const cookieStore = cookies();
  (await cookieStore).delete(SESSION_TOKEN_NAME);
};

// ログアウト処理（Server Action）
export async function logout() {
  await deleteSessionCookie();
  return { success: true };
}

// 現在のセッションからユーザー情報を取得
export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get(SESSION_TOKEN_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  return verifySessionToken(sessionToken);
}

// 認証を要求（認証されていない場合はリダイレクト）
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  return user;
}
