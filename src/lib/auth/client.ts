import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";
import { getCurrentUser } from "./actions/session";

// エラー処理のための独自エラークラス
class ActionError extends Error {}

// 基本となるSafeActionクライアントの作成
export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next, clientInput, metadata }) => {
  // ロギングミドルウェア
  console.log("LOGGING MIDDLEWARE");

  const startTime = performance.now();
  const result = await next();
  const endTime = performance.now();

  console.log("Result ->", result);
  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);
  console.log("Action execution took", endTime - startTime, "ms");

  return result;
});

// 認証済みユーザー用のミドルウェア
export const authActionClient = actionClient.use(async ({ next }) => {
  console.log("AUTH MIDDLEWARE");

  const user = await getCurrentUser();

  if (!user) {
    throw new ActionError("Unauthorized");
  }

  return next();
});

// 認証不要のアクション用（サインイン・サインアップなど）
export const publicActionClient = actionClient.use(async ({ next }) => {
  console.log("PUBLIC ACTION MIDDLEWARE");
  return next();
});

// エクスポート
export { ActionError };
