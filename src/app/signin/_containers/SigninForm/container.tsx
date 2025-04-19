"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { signinAction } from "../../_lib/actions";
import { ActionState } from "@/lib/schema";
import SigninFormPresentational from "./presentational";

// 初期状態の定義
const initialState: ActionState = {
  success: false,
};

export default function SigninFormContainer() {
  // useActionStateを使用して状態管理とディスパッチ関数を取得
  const [state, formAction, pending] = useActionState(
    signinAction,
    initialState
  );

  // エラーメッセージが表示されたときに自動的にフォーカスする
  useEffect(() => {
    if (state.errors?.email) {
      document.getElementById("email")?.focus();
    } else if (state.errors?.password) {
      document.getElementById("password")?.focus();
    }
  }, [state.errors]);

  return (
    <SigninFormPresentational
      state={state}
      formAction={formAction}
      pending={pending}
    />
  );
}
