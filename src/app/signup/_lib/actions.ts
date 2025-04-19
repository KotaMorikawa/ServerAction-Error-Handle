"use server";

import { createSessionToken, hashPassword } from "@/lib/auth";
import { setSessionCookie } from "@/lib/auth-actions";
import { createUser, findUserByEmail } from "@/lib/db";
import { ActionState, signupSchema } from "@/lib/schema";
import { redirect } from "next/navigation";

export async function signupAction(
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
  const result = signupSchema.safeParse({ email, password });

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
    // ユーザーの存在確認
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: "このメールアドレスは既に登録されています",
        errors: {
          email: ["このメールアドレスは既に登録されています"],
        },
      };
    }

    // パスワードのハッシュ化
    const hashedPassword = await hashPassword(password);

    // ユーザーの作成
    const newUser = await createUser(email, hashedPassword);

    // セッショントークンの作成と設定
    const token = createSessionToken({
      userId: newUser.id,
      email: newUser.email,
    });

    // 非同期関数になったので await が必要
    await setSessionCookie(token);
  } catch (error) {
    console.error("Signup error:", error);

    return {
      success: false,
      message: "サーバーエラーが発生しました。しばらくしてからお試しください。",
      errors: {
        general: ["サーバーエラーが発生しました"],
      },
    };
  }

  // ユーザー作成成功時のリダイレクト
  redirect("/dashboard");
}
