import { Card } from '@heroui/react';
import { createElement } from 'react';

import {
  Axiom,
  BetterAuth,
  Bun,
  ClaudeAI,
  Clerk,
  Cloudflare,
  Convex,
  CSharp,
  CSSNew,
  daisyUI,
  Docker,
  DrizzleORM,
  ElysiaJS,
  Expressjs,
  Git,
  GitHub,
  GitHubCopilot,
  GitLab,
  Go,
  HeroUI,
  Hono,
  HTML5,
  IntelliJIDEA,
  Java,
  JavaScript,
  JetBrainsRider,
  Kotlin,
  Linear,
  Lua,
  MongoDB,
  Motion,
  NestJS,
  Nextjs,
  Nodejs,
  Notion,
  Nuxt,
  NuxtUI,
  OpenCode,
  OpenRouter,
  Pocketbase,
  PostgreSQL,
  Prisma,
  Python,
  React,
  Redis,
  shadcnui,
  SQLite,
  Stripe,
  Svelte,
  TailwindCSS,
  TanStack,
  tRPC,
  TypeScript,
  Vercel,
  VisualStudioCode,
  Vue,
  Zed,
} from '@/components/icons';

type Stack = {
  name: string;
  items: {
    name: string;
    link: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
}[];

const stack = [
  {
    name: 'Programming Languages',
    items: [
      {
        name: 'HTML5',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        icon: HTML5,
      },
      {
        name: 'CSS',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        icon: CSSNew,
      },
      {
        name: 'JavaScript',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        icon: JavaScript,
      },
      {
        name: 'TypeScript',
        link: 'https://www.typescriptlang.org',
        icon: TypeScript,
      },
      {
        name: 'C#',
        link: 'https://docs.microsoft.com/en-us/dotnet/csharp',
        icon: CSharp,
      },
      {
        name: 'Go',
        link: 'https://go.dev',
        icon: Go,
      },
      {
        name: 'Java',
        link: 'https://www.java.com',
        icon: Java,
      },
      {
        name: 'Kotlin',
        link: 'https://kotlinlang.org',
        icon: Kotlin,
      },
      {
        name: 'Python',
        link: 'https://www.python.org',
        icon: Python,
      },
      {
        name: 'Lua',
        link: 'https://www.lua.org',
        icon: Lua,
      },
    ],
  },
  {
    name: 'Frontend Frameworks & Libraries',
    items: [
      {
        name: 'React',
        link: 'https://react.dev',
        icon: React,
      },
      {
        name: 'Next.js',
        link: 'https://nextjs.org',
        icon: Nextjs,
      },
      {
        name: 'Tanstack Start',
        link: 'https://tanstack.com/start',
        icon: TanStack,
      },
      {
        name: 'Vue.js',
        link: 'https://vuejs.org',
        icon: Vue,
      },
      {
        name: 'Nuxt',
        link: 'https://nuxt.com',
        icon: Nuxt,
      },
      {
        name: 'Svelte',
        link: 'https://svelte.dev',
        icon: Svelte,
      },
    ],
  },
  {
    name: 'Styling & UI Components',
    items: [
      {
        name: 'Tailwind CSS',
        link: 'https://tailwindcss.com',
        icon: TailwindCSS,
      },
      {
        name: 'shadcn/ui',
        link: 'https://ui.shadcn.com',
        icon: shadcnui,
      },
      {
        name: 'HeroUI',
        link: 'https://heroui.com',
        icon: HeroUI,
      },
      {
        name: 'NuxtUI',
        link: 'https://ui.nuxt.com',
        icon: NuxtUI,
      },
      {
        name: 'daisyUI',
        link: 'https://daisyui.com',
        icon: daisyUI,
      },
      {
        name: 'Motion',
        link: 'https://motion.dev',
        icon: Motion,
      },
    ],
  },
  {
    name: 'Backend Runtime & Frameworks',
    items: [
      {
        name: 'Node.js',
        link: 'https://nodejs.org',
        icon: Nodejs,
      },
      {
        name: 'Bun',
        link: 'https://bun.sh',
        icon: Bun,
      },
      {
        name: 'ElysiaJS',
        link: 'https://elysiajs.com',
        icon: ElysiaJS,
      },
      {
        name: 'Hono',
        link: 'https://hono.dev',
        icon: Hono,
      },
      {
        name: 'Express',
        link: 'https://expressjs.com',
        icon: Expressjs,
      },
      {
        name: 'NestJS',
        link: 'https://nestjs.com',
        icon: NestJS,
      },
      {
        name: 'tRPC',
        link: 'https://trpc.io',
        icon: tRPC,
      },
    ],
  },
  {
    name: 'Database',
    items: [
      {
        name: 'PostgreSQL',
        link: 'https://www.postgresql.org',
        icon: PostgreSQL,
      },
      {
        name: 'SQLite',
        link: 'https://www.sqlite.org',
        icon: SQLite,
      },
      {
        name: 'Convex',
        link: 'https://www.convex.dev',
        icon: Convex,
      },
      {
        name: 'MongoDB',
        link: 'https://www.mongodb.com',
        icon: MongoDB,
      },
      {
        name: 'Redis',
        link: 'https://redis.io',
        icon: Redis,
      },
      {
        name: 'PocketBase',
        link: 'https://pocketbase.io',
        icon: Pocketbase,
      },
      {
        name: 'Drizzle ORM',
        link: 'https://orm.drizzle.team',
        icon: DrizzleORM,
      },
      {
        name: 'Prisma',
        link: 'https://www.prisma.io/orm',
        icon: Prisma,
      },
    ],
  },
  {
    name: 'Authentication & Payments',
    items: [
      {
        name: 'Better Auth',
        link: 'https://better-auth.com',
        icon: BetterAuth,
      },
      {
        name: 'Clerk',
        link: 'https://clerk.com',
        icon: Clerk,
      },
      {
        name: 'Stripe',
        link: 'https://stripe.com',
        icon: Stripe,
      },
    ],
  },
  {
    name: 'Development Tools',
    items: [
      {
        name: 'Zed',
        link: 'https://zed.dev',
        icon: Zed,
      },
      {
        name: 'VS Code',
        link: 'https://code.visualstudio.com',
        icon: VisualStudioCode,
      },
      {
        name: 'IntelliJ IDEA',
        link: 'https://www.jetbrains.com/idea',
        icon: IntelliJIDEA,
      },
      {
        name: 'JetBrains Rider',
        link: 'https://www.jetbrains.com/rider',
        icon: JetBrainsRider,
      },
    ],
  },
  {
    name: 'Deployment & Infrastructure',
    items: [
      {
        name: 'Docker',
        link: 'https://www.docker.com',
        icon: Docker,
      },
      {
        name: 'Vercel',
        link: 'https://vercel.com',
        icon: Vercel,
      },
      {
        name: 'Cloudflare',
        link: 'https://cloudflare.com',
        icon: Cloudflare,
      },
      {
        name: 'Axiom',
        link: 'https://axiom.co',
        icon: Axiom,
      },
    ],
  },
  {
    name: 'Version Control & Collaboration',
    items: [
      {
        name: 'Git',
        link: 'https://git-scm.com',
        icon: Git,
      },
      {
        name: 'GitHub',
        link: 'https://github.com',
        icon: GitHub,
      },
      {
        name: 'GitLab',
        link: 'https://gitlab.com',
        icon: GitLab,
      },
      {
        name: 'Linear',
        link: 'https://linear.app',
        icon: Linear,
      },
      {
        name: 'Notion',
        link: 'https://notion.so',
        icon: Notion,
      },
    ],
  },
  {
    name: 'AI',
    items: [
      {
        name: 'OpenCode',
        link: 'https://opencode.ai',
        icon: OpenCode,
      },
      {
        name: 'OpenRouter',
        link: 'https://openrouter.ai',
        icon: OpenRouter,
      },
      {
        name: 'Github Copilot',
        link: 'https://github.com/copilot',
        icon: GitHubCopilot,
      },
      {
        name: 'Claude AI',
        link: 'https://claude.ai',
        icon: ClaudeAI,
      },
    ],
  },
] satisfies Stack;

export default function TechStack() {
  return (
    <div className="mt-4 flex flex-col items-center gap-y-4">
      <h2 className="text-2xl font-bold">Tech Stack</h2>
      {stack.map((category) => (
        <div key={category.name} className="w-full max-w-5xl space-y-3">
          <h3 className="text-center text-lg font-semibold">{category.name}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {category.items.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                className="h-32 w-28 shrink-0 grow-0"
              >
                <Card className="h-full w-full overflow-hidden">
                  <Card.Content className="flex flex-col items-center justify-center gap-2 text-4xl">
                    {createElement(item.icon, { className: 'size-16' })}
                    <span className="w-full text-center text-xs leading-tight">{item.name}</span>
                  </Card.Content>
                </Card>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
