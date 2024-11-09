"use client";

import { useEffect } from 'react';

export function useResizeObserverFix() {
  useEffect(() => {
    const handler = () => {
      const resizeObserverError = new Error("ResizeObserver loop completed with undelivered notifications.");
      const resizeObserverLimit = Error("ResizeObserver loop limit exceeded");
      
      window.addEventListener("error", (e) => {
        if (e.message === resizeObserverError.message || e.message === resizeObserverLimit.message) {
          e.stopImmediatePropagation();
        }
      });
    };

    window.addEventListener('load', handler);

    return () => window.removeEventListener('load', handler);
  }, []);
}