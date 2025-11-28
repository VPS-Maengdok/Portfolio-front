import { Curriculum } from './curriculum.type';
import { Locale } from './locale.type';

export type WorkType = {
  id: number;
  i18n: WorkTypeI18n[];
  curriculum: Curriculum | null;
};

export type WorkTypeI18n = {
  id: number;
  label: string;
  locale: Locale;
};

export type WorkTypeForm = {
  id?: number;
  i18n: WorkTypeI18nForm[];
  curriculum?: number;
};

export type WorkTypeI18nForm = {
  id?: number;
  label: string;
  locale: number;
};
