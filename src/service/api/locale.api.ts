import { Locale } from '@/types/api/locale.type';
import { apiRequest } from '../apiRequest';

export function getLocales(): Promise<Locale[]> {
  return apiRequest<Locale[]>('/locale/', {
    query: {},
    method: 'GET',
  });
}
