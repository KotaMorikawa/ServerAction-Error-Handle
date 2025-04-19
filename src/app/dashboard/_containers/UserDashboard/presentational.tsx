"use client";

import Link from "next/link";
import LogoutButton from "@/components/logout-button";

interface Props {
  user: {
    userId: string;
    email: string;
  };
}

export default function UserDashboardPresentational({ user }: Props) {
  // 現在の日時を使用してcreatedAtを表示
  const createdAt = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-[85vh] w-full max-w-4xl mx-auto p-6">
      <div className="relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400">
            ダッシュボード
          </h1>
          <p className="text-indigo-200/70 mt-2">
            ようこそ、あなたの個人ダッシュボードへ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ユーザー情報カード */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/30 to-sky-600/30 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative backdrop-blur-xl bg-white/10 p-8 rounded-xl border border-white/20 shadow-xl h-full transform transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-indigo-500/20">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 p-1 mr-4">
                  <div className="rounded-full bg-slate-900 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  プロフィール情報
                </h2>
              </div>

              <div className="space-y-4">
                <div className="border-b border-indigo-200/10 pb-3">
                  <p className="text-sm text-indigo-200/70 mb-1">
                    メールアドレス
                  </p>
                  <p className="text-lg text-white">{user.email}</p>
                </div>

                <div className="border-b border-indigo-200/10 pb-3">
                  <p className="text-sm text-indigo-200/70 mb-1">
                    アカウントID
                  </p>
                  <p className="text-lg text-white font-mono opacity-80">
                    {user.userId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-indigo-200/70 mb-1">
                    アカウント登録日
                  </p>
                  <p className="text-lg text-white">{createdAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* アクションカード */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-600/30 to-indigo-600/30 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative backdrop-blur-xl bg-white/10 p-8 rounded-xl border border-white/20 shadow-xl h-full transform transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-sky-500/20">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 p-1 mr-4">
                  <div className="rounded-full bg-slate-900 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-sky-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white">アクション</h2>
              </div>

              <div className="space-y-4">
                <p className="text-indigo-200/80 mb-4">
                  アカウント設定の変更やログアウトなどのアクションが行えます
                </p>

                <div className="space-y-3">
                  <div className="group/button">
                    <Link
                      href="/"
                      className="flex items-center p-3 rounded-lg bg-indigo-700/30 hover:bg-indigo-700/50 border border-indigo-600/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-700/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      ホームへ戻る
                    </Link>
                  </div>

                  <div className="group/button">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
