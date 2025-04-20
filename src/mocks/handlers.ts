// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

// サーバーアクションのモックを定義
export const handlers = [
  // サインインアクションのモック
  http.post("/api/signin", async () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: { id: 1, email: "test@example.com" },
      },
    });
  }),

  // サインアップアクションのモック
  http.post("/api/signup", async () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: { id: 2, email: "new-user@example.com" },
      },
    });
  }),
];
