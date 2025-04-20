// src/__tests__/signin-action.test.ts
// シンプルなバリデーションテスト用のファイル

import { signinSchema } from "@/lib/schema";

describe("Signin Action Validation", () => {
  test("validates correct email and password format", () => {
    const result = signinSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
  });

  test("rejects invalid email format", () => {
    const result = signinSchema.safeParse({
      email: "invalid-email",
      password: "password123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toContain("email");
    }
  });

  test("rejects empty password", () => {
    const result = signinSchema.safeParse({
      email: "test@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toContain("password");
    }
  });

  test("rejects missing fields", () => {
    const result = signinSchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.length).toBeGreaterThan(0);
    }
  });
});
