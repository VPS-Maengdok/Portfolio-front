import { Curriculum } from '@/types/api/curriculum.type';
import { apiRequest } from '../apiRequest';

type pdfDisposition = 'attachment' | 'inline';
type QueryParams = Record<string, string | number | boolean | undefined>;

const defaultUrl = `${process.env.NEXT_PUBLIC_BACK_END_URL}`;

function buildUrl(path: string, query?: QueryParams): string {
  const url = new URL(path, defaultUrl);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export function getCurriculums(locale: string = 'fr'): Promise<Curriculum[]> {
  return apiRequest<Curriculum[]>('/curriculum/', {
    query: { locale },
    method: 'GET',
  });
}

export function getCurriculum(
  id: number,
  locale: string = 'fr',
): Promise<Curriculum> {
  console.log(locale);
  return apiRequest<Curriculum>(`/curriculum/${id}`, {
    query: { locale },
    method: 'GET',
  });
}

export function getFirstCurriculum(locale: string = 'fr'): Promise<Curriculum> {
  return apiRequest<Curriculum>(`/curriculum/first`, {
    query: { locale },
    method: 'GET',
  });
}

export async function getPDFBlob(
  id: number,
  locale: string = 'fr',
  disposition: pdfDisposition = 'inline',
): Promise<Blob> {
  const url = buildUrl(`/curriculum/pdf/${id}`, { locale, disposition });
  const response = await fetch(url, {
    headers: {
      Accept: 'application/pdf',
    },
  });

  if (!response.ok) {
    let message = 'An error has occurred.';

    try {
      const json = (await response.json()) as { message?: string };
      if (json?.message) {
        message = json.message;
      }
    } catch {}

    throw new Error(message);
  }

  return response.blob();
}
