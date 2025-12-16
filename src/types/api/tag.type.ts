import { Project } from './project.type';
import { Locale } from './locale.type';

export type Tag = {
  id: number;
  i18n: TagI18n[] | TagI18n;
  project: Project[] | null;
};

export type TagI18n = {
  id: number;
  label: string;
  locale: Locale;
};

export type TagForm = {
  id?: number;
  i18n: TagI18n[];
  project?: number[];
};

export type TagI18nForm = {
  id?: number;
  label: string;
  locale: number;
};
