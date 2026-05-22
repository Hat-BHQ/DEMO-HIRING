import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { translations, type TranslationKey } from '../i18n/translations';

interface LangContextValue {
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const t = useCallback((key: TranslationKey): string => {
    return translations[key] || key;
  }, []);

  return (
    <LangContext.Provider value={{ t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
