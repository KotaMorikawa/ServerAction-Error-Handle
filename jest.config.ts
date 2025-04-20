/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Next.jsアプリケーションへのパスを指定
  dir: "./",
});

// Jestに渡すカスタム設定
const customJestConfig: Config = {
  // テストが実行されるディレクトリを追加
  testEnvironment: "jsdom",

  // 自動モックをクリア
  clearMocks: true,

  // カバレッジ関連の設定
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  // テストマッチパターン
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // モジュール名マッピング
  moduleNameMapper: {
    // CSSモジュールのモック
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // パスエイリアス
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // テスト前に実行するセットアップファイル
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // トランスフォーム設定
  transform: {
    // TypeScriptファイルをJestが理解できるように変換
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // ESMパッケージを変換するために、transformIgnorePatternsを上書き
  transformIgnorePatterns: [
    "/node_modules/(?!next-safe-action|@opentelemetry|tough-cookie).+\\.js$",
  ],

  // テスト対象から除外するパス
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/tests/e2e/", // E2Eテストディレクトリを除外
  ],
};

// Next.js用の設定を作成し、エクスポート
export default createJestConfig(customJestConfig);
