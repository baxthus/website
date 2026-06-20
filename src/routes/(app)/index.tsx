import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { Spotify } from '@/components/spotify';
import { env } from '@/env';
import { useLanyardWS } from '@/lib/lanyard/hooks';
import type { LanyardData } from '@/lib/lanyard/types';

export const Route = createFileRoute('/(app)/')({
  component: HomePage,
});

const statusColor: Record<LanyardData['discord_status'], string> = {
  online: 'text-emerald-500',
  idle: 'text-amber-500',
  dnd: 'text-red-500',
  offline: 'text-slate-500',
};

const techStack = [
  {
    label: 'Languages',
    items: 'HTML5, CSS, JavaScript, TypeScript, C#, Go, Java, Kotlin, Python, Lua',
  },
  { label: 'Frontend', items: 'React, Next.js, Tanstack Start, Vue.js, Nuxt, Svelte, SvelteKit' },
  { label: 'Styling', items: 'Tailwind CSS, shadcn/ui, HeroUI, NuxtUI, daisyUI, Motion' },
  { label: 'Backend', items: 'Node.js, Bun, ElysiaJS, Hono, Express, NestJS, tRPC, oRPC' },
  {
    label: 'Database',
    items: 'PostgreSQL, SQLite, Convex, MongoDB, Redis, PocketBase, Drizzle ORM, Prisma',
  },
  { label: 'Auth & Payments', items: 'Better Auth, Clerk, Stripe' },
  { label: 'Infra', items: 'Docker, Podman, Vercel, Cloudflare, Axiom' },
  { label: 'Tools', items: 'Git, GitHub, GitLab, Linear, Notion' },
];

const links = [
  { label: 'Email', name: 'root at baxt.dev', href: 'mailto:root@baxt.dev' },
  { label: 'GitHub', name: 'baxthus', href: 'https://github.com/baxthus' },
  { label: 'Discord', name: 'baxthus', href: `https://discord.com/users/${env.VITE_DISCORD_ID}` },
  { label: 'X', name: '@baxthus', href: 'https://x.com/baxthus' },
  { label: 'Steam', name: 'baxthus', href: 'https://steamcommunity.com/id/baxthus' },
  { label: 'Last.fm', name: 'baxthus', href: 'https://www.last.fm/user/baxthus' },
];

function HomePage() {
  const [lanyard, setLanyard] = useState<LanyardData>();
  useLanyardWS({ socket: true, userId: env.VITE_DISCORD_ID, onPresenceUpdate: setLanyard });

  return (
    <main className="space-y-3.5">
      <p>
        <span>BREATHE SMOKE WHERE THE AIR IS FRESH</span>
        <br />
        <span>Full-Stack Developer (in my dreams)</span>
      </p>

      <h3 className="font-bold">### Now</h3>
      {lanyard ? (
        <>
          <ul>
            <li>
              Currently{' '}
              <span className={statusColor[lanyard.discord_status]}>{lanyard.discord_status}</span>
            </li>
            <li>Location: {lanyard.kv.location}</li>
          </ul>
          <Spotify spotify={lanyard.spotify} />
        </>
      ) : (
        <p>Loading...</p>
      )}

      <h3 className="font-bold">### Tech Stack</h3>
      <ul>
        {techStack.map((item) => (
          <li key={item.label}>
            {item.label}: {item.items}
          </li>
        ))}
      </ul>

      <h3 className="font-bold">### Links</h3>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            {link.label}:{' '}
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
