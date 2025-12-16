import { computeClientLocale } from '@/i18n/i18nContext';

const localeFormat = {
  fr: 'fr-FR',
  en: 'en-US',
  ko: 'ko-KR',
};

export const normalizeDate = (date: string): string => {
  const d = new Date(date);
  const locale = computeClientLocale();

  return new Intl.DateTimeFormat(localeFormat[locale], {
    month: 'short',
    year: 'numeric',
  }).format(d);
};
