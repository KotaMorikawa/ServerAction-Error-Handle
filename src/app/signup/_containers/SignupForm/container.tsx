"use client";

import { useActionState, useEffect } from "react";
import { signupAction } from "../../_lib/actions";
import { ActionState } from "@/lib/schema";
import SignupFormPresentational from "./presentational";

// 初期状態をコンポーネント内で定義
const initialState: ActionState = {
  success: false,
};

export default function SignupFormContainer() {
  const [state, formAction, pending] = useActionState(
    signupAction,
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
    <SignupFormPresentational
      state={state}
      formAction={formAction}
      pending={pending}
    />
  );
}
