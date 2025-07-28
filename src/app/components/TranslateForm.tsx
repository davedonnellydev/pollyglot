"use client";
import styles from "./styles/Form.module.css";
import { JSX } from "react";
import Button from "./Button";

interface Props {
  original: string;
  onOriginalChange: (s: string) => void;
  lang: "fr" | "es" | "jp";
  onLangChange: (l: "fr" | "es" | "jp") => void;
  onTranslate: () => void;
  isLoading?: boolean;
  error?: string;
  remainingRequests: number;
}

export default function TranslateForm({
  original,
  onOriginalChange,
  lang,
  onLangChange,
  onTranslate,
  isLoading = false,
  error = "",
  remainingRequests,
}: Props): JSX.Element {
  return (
    <div data-testid="translate-form" className={styles.card}>
      <label className={styles.label}>Text to translate 👇</label>
      <textarea
        className={styles.textarea}
        value={original}
        onChange={(e) => onOriginalChange(e.target.value)}
        disabled={isLoading}
      />

      <label className={styles.label}>Select language 👇</label>
      <div className={styles.radios}>
        {[
          { id: "fr", label: "French", flag: "/flags/fr-flag.png" },
          { id: "es", label: "Spanish", flag: "/flags/sp-flag.png" },
          { id: "jp", label: "Japanese", flag: "/flags/jpn-flag.png" },
        ].map(({ id, label, flag }) => (
          <label key={id} className={styles.radioLabel}>
            <input
              type="radio"
              name="lang"
              value={id}
              checked={lang === id}
              onChange={() => onLangChange(id as "fr" | "es" | "jp")}
              disabled={isLoading}
            />
            {label} <img src={flag} alt={label} className={styles.flag} />
          </label>
        ))}
      </div>

      {error && (
        <div
          className={styles.error}
          style={{ color: "red", marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}

      <Button onClick={onTranslate} disabled={isLoading}>
        {isLoading ? "Translating..." : "Translate"}
      </Button>
      <div className={styles.usageInfo}>
        <p>
          This app is for educational purposes only. There is a limit to how
          many requests each user can make per 15min block. Remaining requests:{" "}
          {remainingRequests}
        </p>
      </div>
    </div>
  );
}
