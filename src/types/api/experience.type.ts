import { Company } from './company.type';
import { Curriculum } from './curriculum.type';
import { Locale } from './locale.type';
import { Skill } from './skill.type';
import { Technology } from './technology.type';

export type Experience = {
  id: number;
  startingDate: string;
  endingDate: string | null;
  isCurrentWork: boolean;
  company: Company | null;
  curriculum: Curriculum | null;
  i18n: ExperienceI18n[];
  skill: Skill[] | null;
  technology: Technology[] | null;
};

export type ExperienceI18n = {
  id: number;
  label: string;
  description: string;
  slug: string;
  locale: Locale;
};

export type ExperienceForm = {
  id?: number;
  startingDate: string;
  endingDate?: string;
  isCurrentWork: boolean;
  company?: number;
  curriculum?: number;
  i18n: ExperienceI18nForm[];
  skill?: number[];
  technology?: number[];
};

export type ExperienceI18nForm = {
  id?: number;
  label: string;
  description: string;
  slug: string;
  locale: number;
};
