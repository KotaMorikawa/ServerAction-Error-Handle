// src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// ブラウザ環境でのモックサービスワーカーのセットアップ
export const worker = setupWorker(...handlers);
