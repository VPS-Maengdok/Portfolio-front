import { Curriculum } from './curriculum.type';
import { Education } from './education.type';
import { Experience } from './experience.type';
import { Project } from './project.type';

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
