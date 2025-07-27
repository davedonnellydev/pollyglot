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
}

export default function TranslateForm({
  original,
  onOriginalChange,
  lang,
  onLangChange,
  onTranslate,
}: Props): JSX.Element {
  return (
    <div data-testid="translate-form" className={styles.card}>
      <label className={styles.label}>Text to translate 👇</label>
      <textarea
        className={styles.textarea}
        value={original}
        onChange={(e) => onOriginalChange(e.target.value)}
      />

      <label className={styles.label}>Select language 👇</label>
      <div className={styles.radios}>
        {[
          { id: "fr", label: "French flag", flag: "/flags/fr-flag.png" },
          { id: "es", label: "Spanish flag", flag: "/flags/sp-flag.png" },
          { id: "jp", label: "Japanese flag", flag: "/flags/jpn-flag.png" },
        ].map(({ id, label, flag }) => (
          <label key={id} className={styles.radioLabel}>
            <input
              type="radio"
              name="lang"
              value={id}
              checked={lang === id}
              onChange={() => onLangChange(id as "fr" | "es" | "jp")}
            />
            {label} <img src={flag} alt={label} className={styles.flag} />
          </label>
        ))}
      </div>
      <Button onClick={onTranslate}>Translate</Button>
    </div>
  );
}
