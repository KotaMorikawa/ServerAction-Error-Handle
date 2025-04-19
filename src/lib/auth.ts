import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const SALT_ROUNDS = 10;
// 環境変数が存在しない場合にフォールバックを提供
const JWT_SECRET =
  process.env.JWT_SECRET || "fallback-dev-secret-do-not-use-in-production";
export const SESSION_TOKEN_NAME = "session_token";
const TOKEN_EXPIRY = "1d"; // 1日間有効

// パスワードのハッシュ化
export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, SALT_ROUNDS);
};

// パスワードの比較
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword);
};

// セッショントークンの作成
export const createSessionToken = (payload: {
  userId: string;
  email: string;
}): string => {
  return sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

// セッショントークンの検証
export const verifySessionToken = (
  token?: string
): { userId: string; email: string } | null => {
  try {
    if (!token) return null;

    const decoded = verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };
    return decoded;
  } catch (error: unknown) {
    // エラーをログに出力（オプション）
    console.error("トークン検証エラー:", error);
    return null;
  }
};
