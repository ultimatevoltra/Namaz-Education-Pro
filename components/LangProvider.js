'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../lib/i18n';
const LangCtx = createContext({ lang: 'en', t: k => k, toggle: () => {} });
export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const saved = localStorage.getItem('np_lang') || 'en';
    setLang(saved);
  }, []);
  function toggle() {
    const nl = lang === 'en' ? 'bn' : 'en';
    setLang(nl);
    localStorage.setItem('np_lang', nl);
  }
  function t(key) {
    return translations[lang]?.[key] ?? translations['en']?.[key] ?? key;
  }
  return <LangCtx.Provider value={{ lang, t, toggle }}>{children}</LangCtx.Provider>;
}
export function useLang() { return useContext(LangCtx); }