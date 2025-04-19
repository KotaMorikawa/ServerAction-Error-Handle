"use server";

import { comparePassword, createSessionToken } from "@/lib/auth";
import { setSessionCookie } from "@/lib/auth-actions";
import { findUserByEmail } from "@/lib/db";
import { ActionState, signinSchema } from "@/lib/schema";
import { redirect } from "next/navigation";

export async function signinAction(
  state: ActionState,
  formData?: FormData
): Promise<ActionState> {
  // formDataがない場合は現在の状態を返す
  if (!formData) {
    return state;
  }

  // フォームデータの取得
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // バリデーション
  const result = signinSchema.safeParse({ email, password });

  if (!result.success) {
    // バリデーションエラーがある場合
    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: "フォームの入力内容を確認してください",
      errors: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
    };
  }

  try {
    // ユーザーの検索
    const user = await findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "認証に失敗しました",
        errors: {
          general: ["メールアドレスまたはパスワードが正しくありません"],
        },
      };
    }

    // パスワードの検証
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "認証に失敗しました",
        errors: {
          general: ["メールアドレスまたはパスワードが正しくありません"],
        },
      };
    }

    // セッショントークンの作成と設定
    const token = createSessionToken({
      userId: user.id,
      email: user.email,
    });

    // 非同期関数になったので await が必要
    await setSessionCookie(token);
  } catch (error) {
    console.error("Signin error:", error);

    return {
      success: false,
      message: "サーバーエラーが発生しました。しばらくしてからお試しください。",
      errors: {
        general: ["サーバーエラーが発生しました"],
      },
    };
  }

  // ログイン成功時のリダイレクト
  redirect("/dashboard");
}
