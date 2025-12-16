import { Link } from '@/types/api/link.type';
import { apiRequest } from '../apiRequest';

export function getLinks(locale: string = 'fr'): Promise<Link[]> {
  return apiRequest<Link[]>('/link/', {
    query: { locale },
    method: 'GET',
  });
}

export function getLink(id: number, locale: string = 'fr'): Promise<Link> {
  return apiRequest<Link>(`/link/${id}`, {
    query: { locale },
    method: 'GET',
  });
}

export function searchLink(
  label: string,
  locale: string = 'fr',
): Promise<Link> {
  return apiRequest<Link>(`/link/search`, {
    query: { label, locale },
    method: 'GET',
  });
}
