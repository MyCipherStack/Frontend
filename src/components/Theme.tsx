// ThemeInitializer.tsx
'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    const stored = localStorage.getItem("theme-color");
    if (stored) {
      document.documentElement.style.setProperty("--neon-blue", stored);
    }
  }, []);

  return null; // no UI
}
