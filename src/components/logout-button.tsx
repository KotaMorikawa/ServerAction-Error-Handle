"use client";

import { logout } from "@/lib/auth/actions/session-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
      router.push("/signin");
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50"
    >
      {isPending ? "ログアウト中..." : "ログアウト"}
    </button>
  );
}
