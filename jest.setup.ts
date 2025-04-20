// jest.setup.ts
import "@testing-library/jest-dom";

// TextEncoder/TextDecoderのポリフィル
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Fetch APIとBroadcastChannelのモック
global.fetch = jest.fn();
global.Response = jest.fn(() => ({
  json: jest.fn(),
  text: jest.fn(),
  blob: jest.fn(),
  headers: new Map(),
  ok: true,
  status: 200,
})) as unknown as typeof Response;
global.Request = jest.fn() as unknown as typeof Request;
global.Headers = jest.fn(() => new Map()) as unknown as typeof Headers;

// BroadcastChannelのモック
global.BroadcastChannel = class {
  name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => void) | null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => void) | null;

  constructor(name: string = "") {
    this.name = name;
    this.onmessage = null;
    this.onmessageerror = null;
  }
  postMessage = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  dispatchEvent = jest.fn();
  close = jest.fn();
};

// グローバル設定
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// MSWの設定をここに追加
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // 非推奨
    removeListener: jest.fn(), // 非推奨
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// サーバーアクションのモック用設定
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  redirect: jest.fn(),
}));
