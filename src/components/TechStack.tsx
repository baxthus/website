import { Card, CardBody, CardFooter } from '@heroui/react';
import type { JSX } from 'react';
import {
  Astro,
  CSharp,
  CSSNew,
  DaisyUI,
  Discordjs,
  Expressjs,
  Go,
  HeroUI,
  HTML5,
  JavaScript,
  Kotlin,
  Lua,
  Motion,
  Nextjs,
  Nodejs,
  Nuxt,
  NuxtUI,
  Pinia,
  PostgreSQL,
  Python,
  React,
  Shadcnui,
  Svelte,
  TailwindCSS,
  TanStack,
  TypeScript,
  Vue,
  Bun,
  NestJS,
  ElysiaJS,
  Socketio,
  MongoDB,
  Redis,
  Resend,
  Supabase,
  Pocketbase,
  GraphQL,
  TRPC,
  JSON,
  BetterAuth,
  Clerk,
  Stripe,
  VisualStudioCode,
  IntelliJIDEA,
  JetBrainsRider,
  JetBrainsWebStorm,
  Zed,
  DrizzleORM,
  ESLint,
  Prettier,
  Cypress,
  Git,
  GitHub,
  GitLab,
  Linear,
  Playwright,
  Cloudflare,
  Docker,
  Linux,
  Netlify,
  Vercel,
} from './Icons';

const techStack: Array<{
  name: string;
  items: Array<{
    name: string;
    link: string;
    icon: JSX.Element;
  }>;
}> = [
  {
    name: 'Programming Languages',
    items: [
      {
        name: 'HTML5',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        icon: <HTML5 />,
      },
      {
        name: 'CSS',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        icon: <CSSNew />,
      },
      {
        name: 'JavaScript',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        icon: <JavaScript />,
      },
      {
        name: 'TypeScript',
        link: 'https://www.typescriptlang.org',
        icon: <TypeScript />,
      },
      {
        name: 'Python',
        link: 'https://www.python.org',
        icon: <Python />,
      },
      {
        name: 'Go',
        link: 'https://go.dev',
        icon: <Go />,
      },
      {
        name: 'C#',
        link: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
        icon: <CSharp />,
      },
      {
        name: 'Kotlin',
        link: 'https://kotlinlang.org',
        icon: <Kotlin />,
      },
      {
        name: 'Lua',
        link: 'https://www.lua.org',
        icon: <Lua />,
      },
    ],
  },
  {
    name: 'Frontend Frameworks & Libraries',
    items: [
      {
        name: 'React',
        link: 'https://react.dev',
        icon: <React />,
      },
      {
        name: 'Next.js',
        link: 'https://nextjs.org',
        icon: <Nextjs />,
      },
      {
        name: 'Vue.js',
        link: 'https://vuejs.org',
        icon: <Vue />,
      },
      {
        name: 'Nuxt',
        link: 'https://nuxt.com',
        icon: <Nuxt />,
      },
      {
        name: 'Svelte/SvelteKit',
        link: 'https://svelte.dev',
        icon: <Svelte />,
      },
      {
        name: 'Astro',
        link: 'https://astro.build',
        icon: <Astro />,
      },
      {
        name: 'TanStack',
        link: 'https://tanstack.com',
        icon: <TanStack />,
      },
      {
        name: 'Pinia',
        link: 'https://pinia.vuejs.org',
        icon: <Pinia />,
      },
    ],
  },
  {
    name: 'Styling & UI Components',
    items: [
      {
        name: 'Tailwind CSS',
        link: 'https://tailwindcss.com',
        icon: <TailwindCSS />,
      },
      {
        name: 'HeroUI',
        link: 'https://www.heroui.com',
        icon: <HeroUI />,
      },
      {
        name: 'shadcn/ui',
        link: 'https://shadcn.com/ui',
        icon: <Shadcnui />,
      },
      {
        name: 'daisyUI',
        link: 'https://daisyui.com',
        icon: <DaisyUI />,
      },
      {
        name: 'NuxtUI',
        link: 'https://ui.nuxt.com',
        icon: <NuxtUI />,
      },
      {
        name: 'Motion',
        link: 'https://motion.dev',
        icon: <Motion />,
      },
    ],
  },
  {
    name: 'Backend & Runtime',
    items: [
      {
        name: 'Node.js',
        link: 'https://nodejs.org',
        icon: <Nodejs />,
      },
      {
        name: 'Bun',
        link: 'https://bun.sh',
        icon: <Bun />,
      },
      {
        name: 'Express',
        link: 'https://expressjs.com',
        icon: <Expressjs />,
      },
      {
        name: 'NestJS',
        link: 'https://nestjs.com',
        icon: <NestJS />,
      },
      {
        name: 'Elysia',
        link: 'https://elysiajs.com',
        icon: <ElysiaJS />,
      },
      {
        name: 'Socket.IO',
        link: 'https://socket.io',
        icon: <Socketio />,
      },
    ],
  },
  {
    name: 'Database & Storage',
    items: [
      {
        name: 'PostgreSQL',
        link: 'https://www.postgresql.org',
        icon: <PostgreSQL />,
      },
      {
        name: 'MongoDB',
        link: 'https://www.mongodb.com',
        icon: <MongoDB />,
      },
      {
        name: 'Redis',
        link: 'https://redis.io',
        icon: <Redis />,
      },
      {
        name: 'Supabase',
        link: 'https://supabase.com',
        icon: <Supabase />,
      },
      {
        name: 'PocketBase',
        link: 'https://pocketbase.io',
        icon: <Pocketbase />,
      },
      {
        name: 'Drizzle ORM',
        link: 'https://orm.drizzle.team',
        icon: <DrizzleORM />,
      },
    ],
  },
  {
    name: 'APIs & Data',
    items: [
      {
        name: 'GraphQL',
        link: 'https://graphql.org',
        icon: <GraphQL />,
      },
      {
        name: 'tRPC',
        link: 'https://trpc.io',
        icon: <TRPC />,
      },
      {
        name: 'JSON',
        link: 'https://www.json.org',
        icon: <JSON />,
      },
    ],
  },
  {
    name: 'Authentication & Services',
    items: [
      {
        name: 'Better Auth',
        link: 'https://betterauth.dev',
        icon: <BetterAuth />,
      },
      {
        name: 'Clerk',
        link: 'https://clerk.com',
        icon: <Clerk />,
      },
      {
        name: 'Discord.js',
        link: 'https://discord.js.org',
        icon: <Discordjs />,
      },
      {
        name: 'Stripe',
        link: 'https://stripe.com',
        icon: <Stripe />,
      },
      {
        name: 'Resend',
        link: 'https://resend.com',
        icon: <Resend />,
      },
    ],
  },
  {
    name: 'Development Environment',
    items: [
      {
        name: 'Visual Studio Code',
        link: 'https://code.visualstudio.com',
        icon: <VisualStudioCode />,
      },
      {
        name: 'IntelliJ IDEA',
        link: 'https://www.jetbrains.com/idea/',
        icon: <IntelliJIDEA />,
      },
      {
        name: 'JetBrains Rider',
        link: 'https://www.jetbrains.com/rider/',
        icon: <JetBrainsRider />,
      },
      {
        name: 'JetBrains WebStorm',
        link: 'https://www.jetbrains.com/webstorm/',
        icon: <JetBrainsWebStorm />,
      },
      {
        name: 'Zed',
        link: 'https://zed.dev',
        icon: <Zed />,
      },
    ],
  },
  {
    name: 'Development Tools',
    items: [
      {
        name: 'ESLint',
        link: 'https://eslint.org',
        icon: <ESLint />,
      },
      {
        name: 'Prettier',
        link: 'https://prettier.io',
        icon: <Prettier />,
      },
      {
        name: 'Cypress',
        link: 'https://www.cypress.io',
        icon: <Cypress />,
      },
      {
        name: 'Playwright',
        link: 'https://playwright.dev',
        icon: <Playwright />,
      },
    ],
  },
  {
    name: 'Version Control & Collaboration',
    items: [
      {
        name: 'Git',
        link: 'https://git-scm.com',
        icon: <Git />,
      },
      {
        name: 'GitHub',
        link: 'https://github.com',
        icon: <GitHub />,
      },
      {
        name: 'GitLab',
        link: 'https://gitlab.com',
        icon: <GitLab />,
      },
      {
        name: 'Linear',
        link: 'https://linear.app',
        icon: <Linear />,
      },
    ],
  },
  {
    name: 'Deployment & Infrastructure',
    items: [
      {
        name: 'Vercel',
        link: 'https://vercel.com',
        icon: <Vercel />,
      },
      {
        name: 'Cloudflare',
        link: 'https://cloudflare.com',
        icon: <Cloudflare />,
      },
      {
        name: 'Netlify',
        link: 'https://www.netlify.com',
        icon: <Netlify />,
      },
      {
        name: 'Docker',
        link: 'https://www.docker.com',
        icon: <Docker />,
      },
      {
        name: 'Linux',
        link: 'https://www.linux.org',
        icon: <Linux />,
      },
    ],
  },
];

export default function TechStack() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Tech Stack</h2>
      {techStack.map(category => (
        <div key={category.name} className="w-full max-w-5xl">
          <h3 className="mb-3 text-lg font-semibold">{category.name}</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {category.items.map(item => (
              <Card
                key={item.name}
                isPressable
                shadow="sm"
                onPress={() => window.open(item.link, '_blank')}
                className="min-h-24"
              >
                <CardBody className="flex items-center justify-center text-4xl">
                  {item.icon}
                </CardBody>
                <CardFooter className="pt-0">
                  <p className="w-full text-center text-xs leading-tight">
                    {item.name}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
