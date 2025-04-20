// src/__tests__/signin-form.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SigninFormPresentational from "../app/signin/_containers/SigninForm/presentational";
import { ActionState } from "@/lib/auth/types";

// モックの状態とアクション
const mockAction = jest.fn();
const initialState: ActionState = {
  message: "",
  errors: undefined,
};

// テスト前の初期化
beforeEach(() => {
  jest.clearAllMocks();
});

describe("SigninForm Component", () => {
  test("renders sign in form correctly", () => {
    render(
      <SigninFormPresentational
        state={initialState}
        action={mockAction}
        pending={false}
      />
    );

    // フォーム要素が存在するか確認
    expect(screen.getByPlaceholderText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/パスワード/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ログイン/i })
    ).toBeInTheDocument();
  });

  test("handles form submission correctly", async () => {
    const user = userEvent.setup();

    render(
      <SigninFormPresentational
        state={initialState}
        action={mockAction}
        pending={false}
      />
    );

    // フォームに入力
    await user.type(
      screen.getByPlaceholderText(/メールアドレス/i),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText(/パスワード/i), "password123");

    // 送信ボタンをクリック
    await user.click(screen.getByRole("button", { name: /ログイン/i }));

    // actionが正しく呼ばれたことを確認
    await waitFor(() => {
      expect(mockAction).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  test("shows validation errors when state contains errors", async () => {
    // エラーを含む状態を作成
    const stateWithErrors: ActionState = {
      message: "",
      errors: {
        email: ["メールアドレスは必須です"],
        password: ["パスワードは必須です"],
      },
    };

    render(
      <SigninFormPresentational
        state={stateWithErrors}
        action={mockAction}
        pending={false}
      />
    );

    // バリデーションエラーが表示されることを確認
    expect(screen.getByText(/メールアドレスは必須です/i)).toBeInTheDocument();
    expect(screen.getByText(/パスワードは必須です/i)).toBeInTheDocument();
  });
});
