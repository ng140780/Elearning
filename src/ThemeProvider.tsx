import { useEffect, useState } from 'react';
import { learnerStore } from './store/learnerStore';
import type { LearnerSettings } from './types';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<LearnerSettings>(() => learnerStore.getState().settings);

  useEffect(() => {
    const unsubscribe = learnerStore.subscribe((state) => {
      setSettings(state.settings);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = settings.theme;

    // Apply theme
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      // System preference
      root.classList.remove('light', 'dark');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    }

    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.fontSize = fontSizeMap[settings.fontSize];
  }, [settings.theme, settings.fontSize]);

  return <>{children}</>;
}
