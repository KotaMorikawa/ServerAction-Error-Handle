import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/actions";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-40 blur-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-sky-500/20 z-0"></div>
      </div>

      <div className="relative z-10 mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400">
          Next.js 認証デモ
        </h1>
        <p className="text-xl md:text-2xl text-indigo-100/80 max-w-2xl mx-auto leading-relaxed">
          Server Components と Server Actions による
          <span className="inline-block">認証機能の実装</span>
        </p>
      </div>

      <div className="relative z-10 flex flex-col space-y-6 w-full max-w-md">
        {user ? (
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-xl border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-sky-500/10">
            <p className="text-center text-emerald-300 mb-6 font-medium">
              ログイン済みです:{" "}
              <span className="font-bold ml-1">{user.email}</span>
            </p>
            <Link
              href="/dashboard"
              className="block bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold py-4 px-6 rounded-lg text-center shadow-lg hover:shadow-sky-500/25 transform transition-all duration-300 hover:-translate-y-1"
            >
              ダッシュボードへ
            </Link>
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/10 p-10 rounded-xl border border-white/20 shadow-2xl">
            <div className="flex flex-col space-y-5">
              <Link
                href="/signin"
                className="group relative overflow-hidden block bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-lg transition-all duration-300 hover:shadow-sky-500/25 hover:-translate-y-1"
              >
                <span className="relative z-10">ログイン</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-sky-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link
                href="/signup"
                className="group relative overflow-hidden block bg-transparent text-white font-bold py-4 px-6 rounded-lg text-center border border-indigo-400/30 shadow-lg transition-all duration-300 hover:border-indigo-400/50 hover:shadow-indigo-400/10 hover:-translate-y-1"
              >
                <span className="relative z-10">アカウント登録</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-16 text-center text-indigo-200/60">
        <p className="text-sm font-medium">
          Next.js App Router + Server Actions + Prisma + JWT
        </p>
      </div>
    </main>
  );
}
