'use client';
import { Link } from '@heroui/react';

const repoUrl = process.env.NEXT_PUBLIC_REPO_URL!;

export default function Footer() {
  return (
    <footer className="flex justify-center">
      <Link
        href={repoUrl}
        target="_blank"
        color="foreground"
        size="sm"
        underline="hover"
        className="opacity-75"
      >
        source code
      </Link>
    </footer>
  );
}
