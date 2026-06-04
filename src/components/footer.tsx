import { Link } from '@heroui/react';

import { env } from '@/env';

export default function Footer() {
  return (
    <footer>
      <Link href={env.VITE_REPO_URL} target="_blank">
        source code
      </Link>
    </footer>
  );
}
