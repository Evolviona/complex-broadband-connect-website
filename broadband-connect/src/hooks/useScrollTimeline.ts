'use client';

import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';

export function useScrollTimeline(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
    };

    // Throttled version for better performance
    const throttledCalculateScrollProgress = throttle(calculateScrollProgress, 16);

    // Calculate initial value
    calculateScrollProgress();

    window.addEventListener('scroll', throttledCalculateScrollProgress, { passive: true });
    window.addEventListener('resize', throttledCalculateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledCalculateScrollProgress);
      window.removeEventListener('resize', throttledCalculateScrollProgress);
    };
  }, []);

  return scrollProgress;
}