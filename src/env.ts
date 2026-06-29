import { defineEnvVars } from '@sveltejs/kit/hooks';
import z from 'zod';

export const variables = defineEnvVars({
  PUBLIC_URL: {
    public: true,
    schema: z.url().default('http://localhost:5173'),
  },
  DISCORD_ID: {
    public: true,
    schema: z.string(),
  },
  REPO_URL: {
    public: true,
    schema: z.url(),
  },
  LICENSE_URL: {
    public: true,
    schema: z.url(),
  },
  VITE_VERCEL_GIT_COMMIT_REF: {
    public: true,
    schema: z.string().default('unknown'),
  },
  VITE_VERCEL_GIT_COMMIT_SHA: {
    public: true,
    schema: z.string().default('unknown'),
  },
});
