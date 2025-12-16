export const normalizeTranslations = <T,>(i18n: T | T[] | undefined) =>
  i18n ? (Array.isArray(i18n) ? i18n : [i18n]) : [];
