import { Project } from './project.type';
import { Curriculum } from './curriculum.type';
import { Locale } from './locale.type';

export type Link = {
  id: number;
  icon: string;
  isProject: boolean;
  url: string | null;
  repositoryUrl: string | null;
  i18n: LinkI18n[];
  project: Project | null;
  curriculum: Curriculum | null;
};

export type LinkI18n = {
  id: number;
  label: string;
  locale: Locale;
};

export type LinkForm = {
  id?: number;
  icon: string;
  isProject: boolean;
  url?: string;
  repositoryUrl?: string;
  i18n: LinkI18nForm[];
  project?: number;
  curriculum?: number;
};

export type LinkI18nForm = {
  id?: number;
  label: string;
  locale: number;
};
