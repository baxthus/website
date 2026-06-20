import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';

import { Banner } from '@/components/banner';
import { Providers } from '@/components/providers';
import { env } from '@/env';
import type { RouterContext } from '@/router';

import styles from '../styles/main.css?url';

const title = 'baxthus';
const description = 'BREATHE SMOKE WHERE THE AIR IS FRESH';
const url = env.VITE_PUBLIC_URL;
const favicon = `${url}/favicon.ico`;

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title },
      { name: 'description', content: description },
      // Open Graph,
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: favicon },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: favicon },
      { name: 'twitter:creator', content: '@baxthus' },
    ],
    links: [{ rel: 'stylesheet', href: styles }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialised">
        <Providers>
          <Outlet />
        </Providers>
        <Banner />
        <Scripts />
      </body>
    </html>
  );
}
