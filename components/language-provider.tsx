"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "@/lib/translations"

type Language = "en" | "ro" | "ar"
type Direction = "ltr" | "rtl"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: Direction
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [dir, setDir] = useState<Direction>("ltr")

  useEffect(() => {
    // Check if browser language is available in our translations
    const browserLang = navigator.language.split("-")[0] as Language
    if (browserLang && ["en", "ro", "ar"].includes(browserLang)) {
      setLanguage(browserLang)
    }
  }, [])

  useEffect(() => {
    // Set direction based on language
    setDir(language === "ar" ? "rtl" : "ltr")
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key // Return the key if translation not found
      }
    }

    if (typeof value === "object") {
      console.warn(`Translation key "${key}" resolves to an object, not a string`)
      return key
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
