import { Project } from '@/types/api/project.type';
import { apiRequest } from '../apiRequest';

export function getProjects(locale: string = 'fr'): Promise<Project[]> {
  return apiRequest<Project[]>('/project/', {
    query: { locale },
    method: 'GET',
  });
}

export function getProject(
  id: number,
  locale: string = 'fr',
): Promise<Project> {
  return apiRequest<Project>(`/project/${id}`, {
    query: { locale },
    method: 'GET',
  });
}
