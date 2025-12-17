import { IconName } from '@/component/ui/icon';
import { Curriculum } from './curriculum.type';
import { Education } from './education.type';
import { Experience } from './experience.type';
import { Project } from './project.type';

export type Technology = {
  id: number;
  label: string;
  icon: IconName;
  experience: Experience[] | null;
  education: Education[] | null;
  project: Project[] | null;
  curriculum: Curriculum | null;
};

export type TechnologyForm = {
  id?: number;
  label: string;
  icon: IconName;
  experience?: number[];
  education?: number[];
  project?: number[];
  curriculum?: number;
};
