"use client";

import Link from "next/link";
import { AuthFormProps } from "@/lib/auth/types";

export default function SignupFormPresentational({
  state,
  action,
  pending,
}: AuthFormProps) {
  // フォームの送信処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // action関数を呼び出す
    action({ email, password });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-600/20 via-indigo-500/20 to-sky-700/20 rounded-2xl blur-xl opacity-70"></div>

      <div className="relative backdrop-blur-xl bg-white/10 p-8 rounded-xl border border-white/20 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400">
            新規アカウント登録
          </h1>
          <p className="text-indigo-100/80">新しいアカウントを作成しましょう</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="group relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="peer w-full px-4 py-3 bg-black/20 border border-indigo-300/30 rounded-lg outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 placeholder:text-indigo-400/70 focus:placeholder:text-indigo-200/70"
                placeholder="メールアドレス"
              />
            </div>

            {state.errors?.email && (
              <div className="text-red-300 text-sm mt-1">
                {state.errors.email[0]}
              </div>
            )}

            <div className="group relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="peer w-full px-4 py-3 bg-black/20 border border-indigo-300/30 rounded-lg outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 placeholder:text-indigo-400/70 focus:placeholder:text-indigo-200/70"
                placeholder="パスワード"
              />
            </div>

            {state.errors?.password && (
              <div className="text-red-300 text-sm mt-1">
                {state.errors.password[0]}
              </div>
            )}
          </div>

          {state.errors?.general && (
            <div className="p-3 rounded-lg text-sm font-medium bg-red-900/50 text-red-300 border border-red-700/50">
              {state.errors.general[0]}
            </div>
          )}

          {state.message && !state.errors && (
            <div className="p-3 rounded-lg text-sm font-medium bg-green-900/50 text-green-300 border border-green-700/50">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg flex justify-center items-center shadow-lg hover:shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            <span className="relative z-10">
              {pending ? "登録中..." : "アカウント登録"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-700 to-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>

          <div className="text-center text-sm text-indigo-100/70">
            すでにアカウントをお持ちの場合は{" "}
            <Link
              href="/signin"
              className="text-sky-400 hover:text-sky-300 underline decoration-dotted underline-offset-2 transition-colors"
            >
              ログイン
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
