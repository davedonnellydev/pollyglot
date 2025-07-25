import styles from "./styles/header.module.css";
import { JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header role="banner" className={styles.header}>
      <div className={styles.container}>
        <img
          src="/parrot.png"
          alt="A brightly coloured cartoon parrot surrounded by stars"
        />
        <div className={styles.mainTitle}>
          <h1>PollyGlot</h1>
          <h2>Perfect Translation Every Time</h2>
        </div>
      </div>
    </header>
  );
}
