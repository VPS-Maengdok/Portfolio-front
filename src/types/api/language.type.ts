import { Curriculum } from './curriculum.type';
import { Locale } from './locale.type';

export type Language = {
  id: number;
  i18n: LanguageI18n[];
  curriculum: Curriculum | null;
};

export type LanguageI18n = {
  id: number;
  label: string;
  shortened: string | null;
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
  shortened: string;
  level: string;
  locale: number;
};
