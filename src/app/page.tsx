"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import TranslateForm from "./components/TranslateForm";
import ResultsView from "./components/ResultsView";
import { RateLimiter } from "../utils/rateLimiter";

type View = "form" | "results";

export default function Home() {
  const [view, setView] = useState<View>("form");
  const [original, setOriginal] = useState("");
  const [translation, setTranslation] = useState("");
  const [lang, setLang] = useState<"fr" | "es" | "jp">("fr");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [remainingRequests, setRemainingRequests] = useState(10);

  // Update remaining requests on component mount and after translations
  useEffect(() => {
    setRemainingRequests(RateLimiter.getRemainingRequests());
  }, []);

  const handleTranslate = async () => {
    if (!original.trim()) {
      setError("Please enter some text to translate");
      return;
    }

    // Check rate limit before proceeding
    if (!RateLimiter.checkLimit()) {
      setError("Rate limit exceeded. Please try again later.");
      setRemainingRequests(RateLimiter.getRemainingRequests());
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log(`Text to translate: ${original}`);
      console.log(`Language: ${lang}`);

      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: original,
          targetLanguage: lang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error || "Translation failed");
      }

      const result = await response.json();
      setTranslation(result.translation);
      setView("results");

      // Update remaining requests after successful translation
      setRemainingRequests(RateLimiter.getRemainingRequests());
    } catch (err) {
      console.error("Translation error:", err);
      setError(err instanceof Error ? err.message : "Translation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginal("");
    setTranslation("");
    setLang("fr");
    setView("form");
    setError("");
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
          isLoading={isLoading}
          error={error}
          remainingRequests={remainingRequests}
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
