'use client';

import { screenService } from '@/service/screenService';
import { useEffect, useState } from 'react';

export function useIsMobileScreen() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(screenService.getIsMobile());
    };
    const unsubscribe = screenService.subscribe(update);
    update();
    return () => {
      unsubscribe();
    };
  }, []);

  return isMobile;
}
