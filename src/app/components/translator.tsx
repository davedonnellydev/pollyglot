"use client";
import { useState, ChangeEvent } from "react";
import styles from "./styles/translator.module.css";
import { JSX } from "react";

export default function Translator(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("french");

  const chooseLanguage = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const translateText = (formData: FormData) => {
    const language: FormDataEntryValue | null = formData.get("language");
    const textToTranslate: FormDataEntryValue | null =
      formData.get("inputText");
    console.log(`Text to translate: ${textToTranslate}`);
    console.log(`Language: ${language}`);
  };

  return (
    <div data-testid="translator" className={styles.translator}>
      <form action={translateText}>
        <label>
          Text to translate 👇
          <textarea
            name="inputText"
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <section className="languageOptions">
          <h3>Select language 👇</h3>
          <div>
            <label>
              <input
                type="radio"
                id="french"
                name="language"
                value="french"
                checked={selectedLanguage === "french"}
                onChange={chooseLanguage}
              />
              French <img className="flag" src="/fr-flag.png" />
            </label>
            <label>
              <input
                type="radio"
                id="spanish"
                name="language"
                value="spanish"
                checked={selectedLanguage === "spanish"}
                onChange={chooseLanguage}
              />
              Spanish <img className="flag" src="/sp-flag.png" />
            </label>
            <label>
              <input
                type="radio"
                id="japanese"
                name="language"
                value="japanese"
                checked={selectedLanguage === "japanese"}
                onChange={chooseLanguage}
              />
              Japanese <img className="flag" src="/jpn-flag.png" />
            </label>
          </div>
        </section>
        <section>
          <button type="submit">Translate</button>
        </section>
      </form>
    </div>
  );
}
