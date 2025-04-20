"use server";

import { createSessionToken, hashPassword } from "@/lib/auth/auth-utils";
import { setSessionCookie } from "@/lib/auth/actions/session-actions";
import { createUser, findUserByEmail } from "@/lib/db";
import { signupSchema } from "@/lib/schema";
import { redirect } from "next/navigation";
import { publicActionClient } from "@/lib/auth/safe-action-client";

// サインアップアクションの定義
export const signupAction = publicActionClient
  .metadata({
    actionName: "signup",
  })
  .schema(signupSchema)
  .stateAction(async ({ parsedInput }) => {
    try {
      const { email, password } = parsedInput;

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

      // セッションクッキーの設定
      await setSessionCookie(token);
    } catch (error) {
      console.error("Signup error:", error);

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
