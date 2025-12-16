import { Locale } from './locale.type';

export type Country = {
  id: number;
  shortened: string | null;
  i18n: CountryI18n[];
};

export type CountryI18n = {
  id: number;
  label: string;
  locale: Locale;
};

export type CountryForm = {
  id?: number;
  shortened: string;
  i18n: CountryI18nForm[];
};

export type CountryI18nForm = {
  id?: number;
  label: string;
  locale: number;
};
