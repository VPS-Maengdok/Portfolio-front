import { School } from './school.type';
import { Curriculum } from './curriculum.type';
import { Skill } from './skill.type';
import { Technology } from './technology.type';
import { Locale } from './locale.type';

export type Education = {
  id: number;
  startingDate: string;
  endingDate: string | null;
  school: School | null;
  curriculum: Curriculum | null;
  i18n: EducationI18n[];
  skill: Skill[];
  technology: Technology[];
};

export type EducationI18n = {
  id: number;
  label: string;
  diploma: string;
  description: string;
  slug: string;
  locale: Locale;
};

export type EducationForm = {
  id?: number;
  startingDate: string;
  endingDate?: string;
  school?: number;
  curriculum?: number;
  i18n: EducationI18nForm[];
  skill: number[];
  technology: number[];
};

export type EducationI18nForm = {
  id?: number;
  label: string;
  diploma: string;
  description: string;
  slug: string;
  locale: number;
};
