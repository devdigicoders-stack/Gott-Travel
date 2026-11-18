"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Language, translations, Translations } from "@/translations";

interface LanguageContextType {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("gottqatar_lang_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("gottqatar_lang_change", callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("gottqatar_lang") as Language | null;
  return saved || "en";
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore<Language>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("gottqatar_lang", lang);
    window.dispatchEvent(new Event("gottqatar_lang_change"));
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const direction = language === "ar" ? "rtl" : "ltr";
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{ language, direction, setLanguage, toggleLanguage, t }}
    >
      <div
        dir={direction}
        className={`min-h-full flex flex-col flex-1 w-full ${language === "ar" ? "font-arabic" : "font-montserrat font-sans"}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
