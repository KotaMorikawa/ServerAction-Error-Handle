import { requireAuth } from "@/lib/auth/actions/session-actions";
import { Suspense } from "react";
import UserDashboardPresentational from "./presentational";

// ユーザーデータ取得用コンポーネント
async function UserDataContainer() {
  // 認証を要求し、認証されていない場合はサインインページにリダイレクト
  const user = await requireAuth();
  return <UserDashboardPresentational user={user} />;
}

// ローディング状態表示用コンポーネント
function UserDataSkeleton() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-5"></div>
      <div className="border-t border-gray-200 pt-5">
        <div className="py-4">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="py-4 border-t border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboardContainer() {
  return (
    <Suspense fallback={<UserDataSkeleton />}>
      <UserDataContainer />
    </Suspense>
  );
}
