'use client';

import { ReactNode } from 'react';
import QueryClientProviderWrapper from './utils/wrapper/queryClient.wrapper';
import { I18nProvider } from '@/i18n/i18nContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
    </I18nProvider>
  );
}
