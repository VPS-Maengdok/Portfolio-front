import { LocaleType } from '@/types/i18n/locale.type';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';
import { translate, translateList } from './translation';

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

// The locale lives outside React (localStorage, then the browser language), so it
// is read with useSyncExternalStore instead of being copied into state by an effect.
// The server and the first client render (hydration) use 'fr', the language of the
// prerendered HTML; React then re-renders with the client value, without a
// hydration mismatch.
const LOCALE_EVENT = 'locale-change';

function subscribeToLocale(onChange: () => void) {
  window.addEventListener(LOCALE_EVENT, onChange);
  return () => window.removeEventListener(LOCALE_EVENT, onChange);
}

function getServerLocale(): LocaleType {
  return 'fr';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    computeClientLocale,
    getServerLocale,
  );

  const setLocale = useCallback((next: LocaleType) => {
    window.localStorage.setItem('locale', next);
    window.dispatchEvent(new Event(LOCALE_EVENT));
  }, []);

  // Sync the outside world with the current locale: <html lang>, the stored
  // choice, and the components that listen to 'locale-change'. Same as before.
  // Right after hydration, locale is still the server value ('fr') while the
  // client value may differ: skip that pass, or 'fr' would overwrite the stored
  // choice before React re-renders with the client value.
  useEffect(() => {
    if (locale !== computeClientLocale()) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem('locale', locale);
    window.dispatchEvent(new Event(LOCALE_EVENT));
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
