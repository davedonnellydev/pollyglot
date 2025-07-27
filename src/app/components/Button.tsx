import React from "react";
import styles from "./styles/Button.module.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}
export default function Button({ onClick, children }: Props) {
  return (
    <button onClick={onClick} type="button" className={styles.button}>
      {children}
    </button>
  );
}
