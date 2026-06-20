import { env } from '@/env';

export function Footer() {
  return (
    <footer className="space-y-3.5">
      <hr />
      <a href={env.VITE_REPO_URL} target="_blank" rel="noopener noreferrer">
        source code
      </a>
    </footer>
  );
}
