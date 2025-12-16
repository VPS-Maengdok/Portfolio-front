import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { translate, translateList } from './translation';
import { LocaleType } from '@/types/i18n/locale.type';

type I18nContextValue = {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
  t: (key: string) => string;
  tList: (key: string) => string[];
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function computeClientLocale(): LocaleType {
  if (typeof window === 'undefined') return 'fr';

  const stored = window.localStorage.getItem('locale');
  if (stored === 'fr' || stored === 'en' || stored === 'ko') {
    return stored;
  }

  const browser = window.navigator.language.slice(0, 2);
  if (browser === 'fr' || browser === 'en' || browser === 'ko') {
    return browser;
  }

  return 'fr';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleType>('fr');

  useEffect(() => {
    const next = computeClientLocale();
    if (next !== locale) {
      setLocale(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = locale;
      window.localStorage.setItem('locale', locale);
      window.dispatchEvent(new Event('locale-change'));
    }
  }, [locale]);

  const t = (key: string) => translate(locale, key);
  const tList = (key: string) => translateList(locale, key);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tList }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
