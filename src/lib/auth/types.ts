// アクションの状態型
export interface ActionState {
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
  message?: string;
}

// フォームの入力値型
export interface AuthFormInput {
  email: string;
  password: string;
}

// フォームコンポーネントのProps型
export interface AuthFormProps {
  state: ActionState;
  action: (input: AuthFormInput) => void;
  pending: boolean;
}
