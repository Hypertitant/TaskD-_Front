"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { PasswordField } from "@/ui/PasswordField";
import { TextField } from "@/ui/TextField";
import { registerAction } from "../actions";
import type { AuthActionState } from "../types";
import styles from "./AuthForm.module.css";

const initialState: AuthActionState = { ok: false };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className={styles.form} noValidate>
      <div className={styles.row}>
        <TextField
          label="Nom"
          name="lastName"
          defaultValue={state.values?.lastName}
          error={state.fieldErrors?.lastName?.[0]}
          placeholder="Votre nom"
          autoComplete="family-name"
        />
        <TextField
          label="Prénoms"
          name="firstNames"
          defaultValue={state.values?.firstNames}
          error={state.fieldErrors?.firstNames?.[0]}
          placeholder="Vos prénoms"
          autoComplete="given-name"
        />
      </div>

      <TextField
        label="Téléphone"
        name="phone"
        type="tel"
        defaultValue={state.values?.phone}
        error={state.fieldErrors?.phone?.[0]}
        placeholder="+229 01 23 45 67 89"
        autoComplete="tel"
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email?.[0]}
        placeholder="vous@exemple.com"
        autoComplete="email"
      />

      <TextField
        label="Profession"
        name="profession"
        defaultValue={state.values?.profession}
        error={state.fieldErrors?.profession?.[0]}
        placeholder="Ex. Développeur web"
        autoComplete="organization-title"
      />

      <PasswordField
        label="Mot de passe"
        name="password"
        error={state.fieldErrors?.password?.[0]}
        placeholder="8 caractères minimum"
        autoComplete="new-password"
      />

      {state.message && <Alert tone="error">{state.message}</Alert>}

      <Button type="submit" isLoading={isPending} loadingLabel="Inscription…">
        S’inscrire
      </Button>

      <p className={styles.switch}>
        Déjà inscrit ? <Link href="/login">Connectez-vous ici</Link>
      </p>
    </form>
  );
}
