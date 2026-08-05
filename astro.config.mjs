import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField, fontProviders } from 'astro/config';

import svelte from '@astrojs/svelte';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
    },
  ],

  env: {
    schema: {
      PUBLIC_URL: envField.string({
        context: 'server',
        access: 'public',
        url: true,
        default: 'http://localhost:4321',
      }),
      DISCORD_ID: envField.string({ context: 'client', access: 'public' }),
      REPO_URL: envField.string({ context: 'server', access: 'public', url: true }),
      LICENSE_URL: envField.string({ context: 'server', access: 'public', url: true }),
      CF_PAGES_COMMIT_SHA: envField.string({
        context: 'server',
        access: 'public',
        default: 'unknown',
      }),
    },
  },

  integrations: [svelte()],
});