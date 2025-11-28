import { Locale } from './locale.type';
import { Curriculum } from './curriculum.type';

export type Language = {
  id: number;
  i18n: LanguageI18n[];
  curriculum: Curriculum | null;
};

export type LanguageI18n = {
  id: number;
  label: string;
  level: string;
  locale: Locale;
};

export type LanguageForm = {
  id?: number;
  i18n: LanguageI18nForm[];
  curriculum?: number;
};

export type LanguageI18nForm = {
  id?: number;
  label: string;
  level: string;
  locale: number;
};
