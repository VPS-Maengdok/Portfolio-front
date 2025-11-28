import { Project } from './project.type';
import { Locale } from './locale.type';

export type Status = {
  id: number;
  i18n: StatusI18n[];
  project: Project[] | null;
};

export type StatusI18n = {
  id: number;
  label: string;
  locale: Locale;
};

export type StatusForm = {
  id?: number;
  i18n: StatusI18nForm[];
  project?: number[];
};

export type StatusI18nForm = {
  id?: number;
  label: string;
  locale: number;
};
