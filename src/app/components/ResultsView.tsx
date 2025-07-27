import styles from "./styles/Results.module.css";
import Button from "./Button";

interface Props {
  original: string;
  translation: string;
  onStartOver: () => void;
}

export default function ResultsView({
  original,
  translation,
  onStartOver,
}: Props) {
  return (
    <div className={styles.card}>
      <label className={styles.label}>Original text 👇</label>
      <div className={styles.textbox}>{original}</div>

      <label className={styles.label}>Your translation 👇</label>
      <div className={styles.textbox}>{translation}</div>

      <Button onClick={onStartOver}>Start Over</Button>
    </div>
  );
}
