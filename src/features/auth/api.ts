import "server-only";
import { apiPost } from "@/lib/api-client";
import { sessionResponseSchema, type LoginInput, type RegisterInput } from "./schemas";
import type { AuthResult } from "./types";

const isMockEnabled = () => process.env.AUTH_MOCK === "true";

const UNREACHABLE_MESSAGE = "Le serveur est injoignable. Réessayez plus tard.";

async function readToken(response: Response): Promise<string | null> {
  const parsed = sessionResponseSchema.safeParse(await response.json().catch(() => null));
  return parsed.success ? parsed.data.token : null;
}

export async function authenticate(input: LoginInput): Promise<AuthResult> {
  if (isMockEnabled()) {
    if (input.password === "mauvais123") return { ok: false, message: "Identifiants incorrects." };
    return { ok: true, token: "mock-session-token" };
  }

  try {
    const response = await apiPost("/api/v1/auth/login", input);
    if (response.status === 401) return { ok: false, message: "Identifiants incorrects." };
    if (!response.ok) return { ok: false, message: "Connexion impossible pour le moment. Réessayez." };

    const token = await readToken(response);
    if (!token) return { ok: false, message: "Réponse inattendue du serveur." };
    return { ok: true, token };
  } catch {
    return { ok: false, message: UNREACHABLE_MESSAGE };
  }
}

export async function registerAccount(input: RegisterInput): Promise<AuthResult> {
  if (isMockEnabled()) {
    if (input.email.toLowerCase() === "deja@taskd.bj") {
      return { ok: false, message: "Un compte existe déjà avec cet email." };
    }
    return { ok: true, token: "mock-session-token" };
  }

  try {
    const response = await apiPost("/api/v1/auth/register", input);
    if (response.status === 409) return { ok: false, message: "Un compte existe déjà avec cet email." };
    if (!response.ok) return { ok: false, message: "Inscription impossible pour le moment. Réessayez." };

    const token = await readToken(response);
    if (!token) return { ok: false, message: "Réponse inattendue du serveur." };
    return { ok: true, token };
  } catch {
    return { ok: false, message: UNREACHABLE_MESSAGE };
  }
}
