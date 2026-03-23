import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { vi, en, type TranslationKey } from '../i18n/translations';
import type { Lang } from '../types';

interface LangContextValue {
  lang: Lang;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const translations = { vi, en };

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'vi');

  const t = useCallback((key: TranslationKey): string => {
    return translations[lang][key] || key;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'vi' ? 'en' : 'vi';
      localStorage.setItem('lang', next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
