import Image from "next/image";
import { BackLink } from "./BackLink";
import styles from "./AuthShell.module.css";

type AuthShellProps = {
  title: string;
  subtitle: string;
  illustration: { src: string; width: number; height: number };
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, illustration, children }: AuthShellProps) {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <BackLink />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <Image
          className={styles.illustration}
          src={illustration.src}
          width={illustration.width}
          height={illustration.height}
          alt=""
          priority
        />
      </section>
      <section className={styles.card}>{children}</section>
    </main>
  );
}
