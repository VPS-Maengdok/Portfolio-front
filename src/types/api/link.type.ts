import { IconName } from '@/component/ui/icon';
import { Curriculum } from './curriculum.type';
import { Locale } from './locale.type';
import { Project } from './project.type';

export type Link = {
  id: number;
  icon: IconName;
  isProject: boolean;
  url: string | null;
  repositoryUrl: string | null;
  i18n: LinkI18n[] | LinkI18n;
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
  icon: IconName;
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
