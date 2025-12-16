import { Country } from './country.type';
import { Education } from './education.type';
import { Experience } from './experience.type';
import { Language } from './language.type';
import { Link } from './link.type';
import { Locale } from './locale.type';
import { Project } from './project.type';
import { Skill } from './skill.type';
import { Technology } from './technology.type';
import { WorkType } from './workType.type';

export type Curriculum = {
  id: number;
  firstname: string;
  lastname: string;
  city: string | null;
  isFreelance: boolean;
  freelanceCompanyName: string;
  isAvailable: boolean;
  hasVisa: boolean;
  visaAvailableFor: Country[] | null;
  workType: WorkType[] | null;
  link: Link[] | null;
  experience: Experience[] | null;
  education: Education[] | null;
  technology: Technology[] | null;
  skill: Skill[] | null;
  project: Project[] | null;
  language: Language[] | null;
  expectedCountry: Country[] | null;
  i18n: CurriculumI18n[];
  location: Country | null;
};

export type CurriculumI18n = {
  id: number;
  label: string;
  slug: string;
  locale: Locale;
};

export type CurriculumForm = {
  id?: number;
  firstname: string;
  lastname: string;
  city: string;
  isFreelance: boolean;
  freelanceCompanyName: string;
  isAvailable: boolean;
  hasVisa: boolean;
  visaAvailableFor?: number[];
  workType?: number[];
  link?: number[];
  experience?: number[];
  education?: number[];
  technology?: number[];
  skill?: number[];
  project?: number[];
  language?: number[];
  expectedCountry?: number[];
  i18n: CurriculumI18nForm[];
  location?: number;
};

export type CurriculumI18nForm = {
  id?: number;
  label: string;
  slug: string;
  locale: number;
};
