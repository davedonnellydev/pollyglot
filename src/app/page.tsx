import styles from "./page.module.css";
import Header from "./components/header";
import Translator from "./components/translator";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Translator />
      </main>
    </div>
  );
}
