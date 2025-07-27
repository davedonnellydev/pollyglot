import styles from "./styles/Header.module.css";
import { JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <img
        src="/parrot.png"
        alt="A brightly coloured cartoon parrot surrounded by stars"
        className={styles.logo}
      />
      <h1 className={styles.title}>PollyGlot</h1>
      <h2 className={styles.subtitle}>Perfect Translation Every Time</h2>
    </header>
  );
}
