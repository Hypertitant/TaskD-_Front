import styles from "./Alert.module.css";

type AlertProps = {
  tone?: "error" | "success";
  children: React.ReactNode;
};

export function Alert({ tone = "error", children }: AlertProps) {
  return (
    <p className={`${styles.alert} ${styles[tone]}`} role="alert">
      {children}
    </p>
  );
}
