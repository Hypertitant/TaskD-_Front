"use client";

import { useRouter } from "next/navigation";
import styles from "./AuthShell.module.css";

export function BackLink() {
  const router = useRouter();

  return (
    <button type="button" className={styles.back} onClick={() => router.back()}>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
        <path
          d="M15 6H1M1 6l5-5M1 6l5 5"
          stroke="#212135"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Retour
    </button>
  );
}
