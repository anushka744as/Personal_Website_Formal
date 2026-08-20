import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://nicolrider.com',
  integrations: [react()],
  devToolbar: {
    enabled: false,
  },
});

