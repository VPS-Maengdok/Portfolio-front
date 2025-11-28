import { Experience } from './experience.type';
import { Education } from './education.type';
import { Project } from './project.type';
import { Curriculum } from './curriculum.type';

export type Technology = {
  id: number;
  label: string;
  icon: string;
  experience: Experience[] | null;
  education: Education[] | null;
  project: Project[] | null;
  curriculum: Curriculum | null;
};

export type TechnologyForm = {
  id?: number;
  label: string;
  icon: string;
  experience?: number[];
  education?: number[];
  project?: number[];
  curriculum?: number;
};
