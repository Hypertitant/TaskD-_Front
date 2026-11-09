"use client";

import { useState } from "react";
import { TextField } from "../TextField";
import styles from "./PasswordField.module.css";

type PasswordFieldProps = Omit<React.ComponentProps<typeof TextField>, "type" | "endAdornment">;

export function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={isVisible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {isVisible ? "Masquer" : "Afficher"}
        </button>
      }
    />
  );
}
