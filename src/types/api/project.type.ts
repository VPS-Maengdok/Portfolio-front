import { Company } from './company.type';
import { Link } from './link.type';
import { School } from './school.type';
import { Skill } from './skill.type';
import { Status } from './status.type';
import { Tag } from './tag.type';
import { Technology } from './technology.type';
import { Curriculum } from './curriculum.type';
import { Picture } from './picture.type';
import { Locale } from './locale.type';

export type Project = {
  id: number;
  creationDate: string;
  isHidden: boolean;
  status: Status;
  company: Company | null;
  school: School | null;
  curriculum: Curriculum | null;
  i18n: ProjectI18n[] | ProjectI18n;
  tag: Tag[] | null;
  skill: Skill[] | null;
  technology: Technology[] | null;
  picture: Picture[] | null;
  link: Link[] | null;
};

export type ProjectI18n = {
  id: number;
  label: string;
  description: string;
  shortDescription: string;
  cvDescription: string;
  slug: string;
  locale: Locale;
};

export type ProjectForm = {
  id?: number;
  creationDate: string;
  isHidden: boolean;
  status: number;
  company?: number;
  school?: number;
  curriculum?: number;
  i18n: ProjectI18nForm[];
  tag?: number[];
  skill?: number[];
  technology?: number[];
  picture?: number[];
  link?: number[];
};

export type ProjectI18nForm = {
  id?: number;
  label: string;
  description: string;
  shortDescription: string;
  cvDescription: string;
  slug: string;
  locale: number;
};
