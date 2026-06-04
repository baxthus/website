import { Button } from '@heroui/react';
import { IconMapPin } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { Avatar } from '@/components/app/avatar';
import SpotifyCard from '@/components/app/spotify-card';
import { env } from '@/env';
import { useLanyardWS } from '@/lib/lanyard/hooks';
import type { LanyardData } from '@/lib/lanyard/types';

export const Route = createFileRoute('/(app)/')({
  component: HomePage,
});

const description = `
BREATHE SMOKE WHERE THE AIR IS FRESH
Full-Stack Developer (in my dreams)
`.trim();

function HomePage() {
  const [lanyard, setLanyard] = useState<LanyardData>();
  useLanyardWS({ socket: true, userId: env.VITE_DISCORD_ID, onPresenceUpdate: setLanyard });

  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <Avatar status={lanyard?.discord_status ?? 'offline'} />

      <h1 className="text-4xl font-bold">baxthus</h1>

      <a
        href={
          lanyard?.kv.location
            ? `https://www.google.com/maps/search/?api=1&query=${lanyard?.kv.location}`
            : undefined
        }
        target="_blank"
        aria-disabled={!lanyard?.kv.location}
      >
        <Button variant="tertiary" isDisabled={!lanyard?.kv.location}>
          <IconMapPin stroke={1.5} className="size-5" />
          {lanyard?.kv.location ?? 'Loading...'}
        </Button>
      </a>

      <p className="text-center whitespace-pre-wrap">{description}</p>

      {lanyard?.spotify && <SpotifyCard spotify={lanyard?.spotify} />}
    </div>
  );
}
