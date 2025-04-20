"use client";

import { useStateAction } from "next-safe-action/stateful-hooks";
import { signinAction } from "../../_lib/actions";
import SigninFormPresentational from "./presentational";

export default function SigninFormContainer() {
  // next-safe-actionのuseStateActionフックを使用して状態管理
  const { execute, result, status } = useStateAction(signinAction, {
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
    <SigninFormPresentational
      state={transformedState}
      action={execute}
      pending={pending}
    />
  );
}
