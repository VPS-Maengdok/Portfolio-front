import { LocaleType } from '@/types/i18n/locale.type';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ko from './locales/ko.json';

const translations: Record<LocaleType, object> = {
  fr,
  en,
  ko,
} as const;

function translateRaw(locale: LocaleType, key: string): unknown {
  const parts = key.split('.');
  let current: unknown = translations[locale];

  for (const part of parts) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return current;
}

export function translate(locale: LocaleType, key: string): string {
  const parts = key.split('.');
  let current: unknown = translations[locale];

  for (const part of parts) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof current === 'string' ? current : key;
}

export function translateList(locale: LocaleType, key: string): string[] {
  const value = translateRaw(locale, key);
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string');
  }

  return [translate(locale, key)];
}
