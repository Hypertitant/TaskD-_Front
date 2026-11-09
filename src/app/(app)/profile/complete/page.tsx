import type { Metadata } from "next";
import { logoutAction } from "@/features/auth";
import { Button } from "@/ui/Button";

export const metadata: Metadata = { title: "Compléter mon profil" };

export default function CompleteProfilePage() {
  return (
    <main style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Complétez votre profil</h1>
      <p>Page à construire.</p>
      <form action={logoutAction}>
        <Button type="submit" variant="secondary">
          Se déconnecter
        </Button>
      </form>
    </main>
  );
}
