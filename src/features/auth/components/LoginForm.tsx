"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { PasswordField } from "@/ui/PasswordField";
import { TextField } from "@/ui/TextField";
import { loginAction } from "../actions";
import type { AuthActionState } from "../types";
import styles from "./AuthForm.module.css";

const initialState: AuthActionState = { ok: false };

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className={styles.form} noValidate>
      <input type="hidden" name="next" value={nextPath ?? ""} />

      <TextField
        label="Nom d’utilisateur ou email"
        name="identifier"
        defaultValue={state.values?.identifier}
        error={state.fieldErrors?.identifier?.[0]}
        placeholder="Votre nom d’utilisateur ou email"
        autoComplete="username"
      />

      <PasswordField
        label="Mot de passe"
        name="password"
        error={state.fieldErrors?.password?.[0]}
        placeholder="Votre mot de passe"
        autoComplete="current-password"
      />

      {state.message && <Alert tone="error">{state.message}</Alert>}

      <Button type="submit" isLoading={isPending} loadingLabel="Connexion…">
        Se connecter
      </Button>

      <p className={styles.switch}>
        Pas encore inscrit ? <Link href="/register">Inscrivez-vous ici</Link>
      </p>
    </form>
  );
}
