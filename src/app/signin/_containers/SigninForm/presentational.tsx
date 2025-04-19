"use client";

import Link from "next/link";

interface Props {
  state: {
    errors?: {
      email?: string[];
      password?: string[];
      general?: string[];
    };
    message?: string;
  };
  // execute関数の型を修正 - useStateActionの戻り値の型に合わせる
  action: (input: { email: string; password: string }) => void;
  pending: boolean;
}

export default function SigninFormPresentational({
  state,
  action,
  pending,
}: Props) {
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
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 via-sky-500/20 to-indigo-700/20 rounded-2xl blur-xl opacity-70"></div>

      <div className="relative backdrop-blur-xl bg-white/10 p-8 rounded-xl border border-white/20 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400">
            アカウントにログイン
          </h1>
          <p className="text-indigo-100/80">
            あなたのアカウント情報を入力してください
          </p>
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
            className="group relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-semibold py-3 px-4 rounded-lg flex justify-center items-center shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            <span className="relative z-10">
              {pending ? "ログイン中..." : "ログイン"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-sky-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>

          <div className="text-center text-sm text-indigo-100/70">
            アカウントをお持ちでない場合は{" "}
            <Link
              href="/signup"
              className="text-indigo-400 hover:text-indigo-300 underline decoration-dotted underline-offset-2 transition-colors"
            >
              新規登録
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
