import React, { useEffect, useState } from 'react';
import { ParticleBackground } from './ParticleBackground';
import type { ParticlePresetKey } from './particlePresets';

export const ThemeParticleBackground: React.FC = () => {
  const [theme, setTheme] = useState<ParticlePresetKey>('light');

  useEffect(() => {
    // Initial theme check
    const getTheme = () => {
      const savedTheme = localStorage.getItem('theme') as ParticlePresetKey;
      const htmlTheme = document.documentElement.getAttribute('data-theme') as ParticlePresetKey;
      return htmlTheme || savedTheme || 'light';
    };

    setTheme(getTheme());

    // Observer for theme changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setTheme(getTheme());
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return <ParticleBackground presetKey={theme} className="fixed inset-0 -z-10" />;
};
