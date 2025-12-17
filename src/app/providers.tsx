'use client';

import { I18nProvider } from '@/i18n/i18nContext';
import { ReactNode } from 'react';
import QueryClientProviderWrapper from './utils/wrapper/queryClient.wrapper';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
    </I18nProvider>
  );
}
