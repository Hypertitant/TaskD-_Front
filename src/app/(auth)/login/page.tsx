import type { Metadata } from "next";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = { title: "Connexion" };

type LoginPageProps = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <AuthShell
      title="Connectez vous"
      subtitle="Bienvenue à vous. Accédez maintenant à votre univers"
      illustration={{ src: "/images/login-illustration.png", width: 590, height: 598 }}
    >
      <LoginForm nextPath={next} />
    </AuthShell>
  );
}
