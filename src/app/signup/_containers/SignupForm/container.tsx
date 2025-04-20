"use client";

import { signupAction } from "../../_lib/actions";
import SignupFormPresentational from "./presentational";
import { useStateAction } from "next-safe-action/stateful-hooks";

export default function SignupFormContainer() {
  // next-safe-actionのuseStateActionフックを使用して状態管理
  const { execute, result, status } = useStateAction(signupAction, {
    initResult: {},
  });

  // ステータスからペンディング状態を取得
  const pending = status === "executing";

  // Transform result data to match the expected state structure
  const transformedState = {
    errors: result?.data?.errors,
    message: result?.data?.message,
  };

  return (
    <SignupFormPresentational
      state={transformedState}
      action={execute}
      pending={pending}
    />
  );
}
