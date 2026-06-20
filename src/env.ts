import { createEnv } from '@t3-oss/env-core';
import z from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_PUBLIC_URL: z.url().default('http://localhost:3000'),
    VITE_DISCORD_ID: z.string(),
    VITE_REPO_URL: z.url(),
    VITE_LICENSE_URL: z.url(),
    VITE_VERCEL_GIT_COMMIT_REF: z.string().default('unknown'),
    VITE_VERCEL_GIT_COMMIT_SHA: z.string().default('unknown'),
  },

  runtimeEnv: Object.assign(process.env, import.meta.env),
  emptyStringAsUndefined: true,
});
