"use client";

import { useEffect } from 'react';

export function ResizeObserverFix() {
  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      if (
        e.message === "ResizeObserver loop completed with undelivered notifications." ||
        e.message === "ResizeObserver loop limit exceeded"
      ) {
        const resizeObserverError = e;
        e.stopImmediatePropagation();
        console.warn('ResizeObserver error prevented:', resizeObserverError);
      }
    };

    window.addEventListener('error', handler);

    return () => window.removeEventListener('error', handler);
  }, []);

  return null;
}