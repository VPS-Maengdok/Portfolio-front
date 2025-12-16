const defaultUrl = `${process.env.NEXT_PUBLIC_BACK_END_URL}`;

type ErrorResponse = {
  error?: string;
  message: string;
  statusCode: number;
};

type ApiResponse<T> = {
  data: T;
};

type QueryParams = Record<string, string | number | boolean | undefined>;

type ApiOptions = Omit<RequestInit, 'body'> & {
  query?: QueryParams;
  body?: unknown;
};

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

export async function apiRequest<TData>(
  path: string,
  options: ApiOptions = {},
): Promise<TData> {
  const { query, body, headers, ...rest } = options;

  const url = buildUrl(path, query);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    let message = 'An error has occurred.';

    try {
      const json = (await response.json()) as ErrorResponse;
      if (json?.message) {
        message = json.message;
      }
    } catch {}

    throw new Error(message);
  }

  const json = (await response.json()) as ApiResponse<TData>;
  return json.data;
}
