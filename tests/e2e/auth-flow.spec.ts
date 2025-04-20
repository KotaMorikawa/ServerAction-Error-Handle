// tests/e2e/auth-flow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("認証フロー", () => {
  test("サインアップからサインイン、ダッシュボード表示、ログアウトまでの一連のフロー", async ({
    page,
  }) => {
    // 一意のテストユーザーを作成
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = "password123";

    // サインアップページにアクセス
    await page.goto("/signup");
    // タイトルの確認を実際のタイトルに合わせる
    await expect(page).toHaveTitle(/認証デモ/);

    // サインアップフォームに入力（日本語のラベルに合わせて修正）
    await page.getByPlaceholder(/メールアドレス/).fill(testEmail);
    await page.getByPlaceholder(/パスワード/).fill(testPassword);
    await page.getByRole("button", { name: /登録/ }).click();

    // ダッシュボードページにリダイレクトされることを確認
    await expect(page).toHaveURL("/dashboard");
    // ダッシュボードのh1要素を選択して確認
    await expect(
      page.getByRole("heading", { name: "ダッシュボード" })
    ).toBeVisible();

    // ログアウトする
    await page.getByRole("button", { name: /ログアウト/ }).click();

    // サインインページにリダイレクトされることを確認
    await expect(page).toHaveURL("/signin");

    // サインインフォームに入力
    await page.getByPlaceholder(/メールアドレス/).fill(testEmail);
    await page.getByPlaceholder(/パスワード/).fill(testPassword);
    await page.getByRole("button", { name: /ログイン/ }).click();

    // 再度ダッシュボードページにリダイレクトされることを確認
    await expect(page).toHaveURL("/dashboard");
    await expect(
      page.getByRole("heading", { name: "ダッシュボード" })
    ).toBeVisible();
  });

  test("無効な認証情報でサインインに失敗する", async ({ page }) => {
    // サインインページにアクセス
    await page.goto("/signin");

    // 無効な認証情報を入力
    await page.getByPlaceholder(/メールアドレス/).fill("invalid@example.com");
    await page.getByPlaceholder(/パスワード/).fill("wrongpassword");
    await page.getByRole("button", { name: /ログイン/ }).click();

    // エラーメッセージが表示されることを確認（日本語のエラーメッセージに合わせる）
    await expect(
      page.getByText(
        /認証に失敗しました|メールアドレスまたはパスワードが正しくありません/
      )
    ).toBeVisible();

    // ページ遷移が発生しないことを確認
    await expect(page).toHaveURL("/signin");
  });
});
