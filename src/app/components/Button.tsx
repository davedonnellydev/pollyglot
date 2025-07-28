import React from "react";
import styles from "./styles/Button.module.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}
export default function Button({ onClick, children, disabled = false }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
