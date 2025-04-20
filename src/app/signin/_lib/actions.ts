"use server";

import { publicActionClient } from "@/lib/auth/safe-action-client";
import { comparePassword, createSessionToken } from "@/lib/auth/auth-utils";
import { setSessionCookie } from "@/lib/auth/actions/session-actions";
import { findUserByEmail } from "@/lib/db";
import { signinSchema } from "@/lib/schema";
import { redirect } from "next/navigation";

// サインインアクションの定義
export const signinAction = publicActionClient
  .metadata({
    actionName: "signin",
  })
  .schema(signinSchema)
  .stateAction(async ({ parsedInput }) => {
    try {
      const { email, password } = parsedInput;

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

      // セッションクッキーの設定
      await setSessionCookie(token);

      // ログイン成功
    } catch (error) {
      console.error("Signin error:", error);

      return {
        success: false,
        message:
          "サーバーエラーが発生しました。しばらくしてからお試しください。",
        errors: {
          general: ["サーバーエラーが発生しました"],
        },
      };
    }
    redirect("/dashboard");
  });
