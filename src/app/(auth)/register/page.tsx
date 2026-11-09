import type { Metadata } from "next";
import { AuthShell } from "@/components/AuthShell";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = { title: "Inscription" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Inscrivez-vous ici"
      subtitle="Bénéficiez de toutes les honneurs dont vous avez besoin"
      illustration={{ src: "/images/register-illustration.png", width: 590, height: 727 }}
    >
      <RegisterForm />
    </AuthShell>
  );
}
