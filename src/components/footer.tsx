import { env } from '@/env';

import { Badges } from './badges';

export function Footer() {
  return (
    <footer className="space-y-3.5">
      <hr />
      <Badges />
      <div>
        <p>
          Source code{' '}
          <a href={env.VITE_REPO_URL} target="_blank" rel="noopener noreferrer">
            available here
          </a>
          , released under the{' '}
          <a href={env.VITE_LICENSE_URL} target="_blank" rel="noopener noreferrer">
            GNU AGPLv3 license
          </a>
        </p>
        <p>
          Ref: {env.VITE_VERCEL_GIT_COMMIT_REF} | Commit: {env.VITE_VERCEL_GIT_COMMIT_SHA}
        </p>
      </div>
    </footer>
  );
}
