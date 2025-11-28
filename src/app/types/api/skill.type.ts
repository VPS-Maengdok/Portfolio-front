import { Curriculum } from './curriculum.type';
import { Experience } from './experience.type';
import { Education } from './education.type';
import { Project } from './project.type';
import { Locale } from './locale.type';

export type Skill = {
  id: number;
  i18n: SkillI18n[];
  curriculum: Curriculum | null;
  experience: Experience[] | null;
  education: Education[] | null;
  project: Project[] | null;
};

export type SkillI18n = {
  id: number;
  label: string;
  locale: Locale;
};

export type SkillForm = {
  id?: number;
  i18n: SkillI18nForm[];
  curriculum?: number;
  experience?: number[];
  education?: number[];
  project?: number[];
};

export type SkillI18nForm = {
  id?: number;
  label: string;
  locale: number;
};
