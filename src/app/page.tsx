"use client";

import { useState } from "react";
import Header from "./components/Header";
import TranslateForm from "./components/TranslateForm";
import ResultsView from "./components/ResultsView";

type View = "form" | "results";

export default function Home() {
  const [view, setView] = useState<View>("form");
  const [original, setOriginal] = useState("");
  const [translation, setTranslation] = useState("");
  const [lang, setLang] = useState<"fr" | "es" | "jp">("fr");

  const handleTranslate = async () => {
    console.log(`Text to translate: ${original}`);
    console.log(`Lanugage: ${lang}`);

    // → call your translation API here
    // const result = await fetch('/api/translate', {/*…*/})
    // setTranslation(result.text);
    setView("results");
  };

  const handleReset = () => {
    setOriginal("");
    setTranslation("");
    setLang("fr");
    setView("form");
  };

  return (
    <>
      <Header />
      {view === "form" ? (
        <TranslateForm
          original={original}
          onOriginalChange={setOriginal}
          lang={lang}
          onLangChange={setLang}
          onTranslate={handleTranslate}
        />
      ) : (
        <ResultsView
          original={original}
          translation={translation}
          onStartOver={handleReset}
        />
      )}
    </>
  );
}
