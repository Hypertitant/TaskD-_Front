"use server";

import { redirect } from "next/navigation";
import {
  DEFAULT_REDIRECT_AFTER_LOGIN,
  DEFAULT_REDIRECT_AFTER_REGISTER,
} from "@/lib/constants";
import { toSafePath } from "@/lib/safe-redirect";
import { authenticate, registerAccount } from "./api";
import { loginSchema, registerSchema } from "./schemas";
import { createSession, destroySession } from "./session";
import type { AuthActionState } from "./types";

function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function loginAction(_previous: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const raw = {
    identifier: readText(formData, "identifier"),
    password: readText(formData, "password"),
  };
  const values = { identifier: raw.identifier };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors, values };
  }

  const result = await authenticate(parsed.data);
  if (!result.ok) return { ok: false, message: result.message, values };

  await createSession(result.token);
  redirect(toSafePath(readText(formData, "next"), DEFAULT_REDIRECT_AFTER_LOGIN));
}

export async function registerAction(_previous: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const raw = {
    lastName: readText(formData, "lastName"),
    firstNames: readText(formData, "firstNames"),
    phone: readText(formData, "phone"),
    email: readText(formData, "email"),
    profession: readText(formData, "profession"),
    password: readText(formData, "password"),
  };
  const values = {
    lastName: raw.lastName,
    firstNames: raw.firstNames,
    phone: raw.phone,
    email: raw.email,
    profession: raw.profession,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors, values };
  }

  const result = await registerAccount(parsed.data);
  if (!result.ok) return { ok: false, message: result.message, values };

  await createSession(result.token);
  redirect(DEFAULT_REDIRECT_AFTER_REGISTER);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}
