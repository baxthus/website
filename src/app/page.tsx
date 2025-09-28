'use client';
import { Avatar, Button, type ButtonProps } from '@heroui/react';
import { IconMapPin } from '@tabler/icons-react';
import { useLanyardWS, type Types } from 'use-lanyard';
import Spotify from '@/components/Spotify';
import TechStack from '@/components/TechStack';
import Links from '@/components/Links';

const discordId = process.env.NEXT_PUBLIC_DISCORD_ID as Types.Snowflake;

const description = `
BREATHE SMOKE WHERE THE AIR IS FRESH
Full-Stack Developer (in my dreams)
`.trim();

export default function Home() {
  const lanyard = useLanyardWS(discordId);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Avatar
        className="text-large size-32"
        src="/avatar.jpeg"
        isBordered
        color={
          {
            online: 'success',
            idle: 'warning',
            dnd: 'danger',
            offline: 'default',
          }[lanyard?.discord_status ?? 'offline'] as ButtonProps['color']
        }
        alt="Avatar"
      />

      <h1 className="text-4xl font-bold">baxthus</h1>

      <Button
        variant="flat"
        startContent={<IconMapPin stroke={1.5} />}
        radius="full"
        as="a"
        href={`https://www.google.com/maps/search/?api=1&query=${lanyard?.kv.location}`}
        target="_blank"
        isDisabled={!lanyard?.kv.location}
      >
        {lanyard?.kv.location ?? 'Loading...'}
      </Button>

      <p className="text-center whitespace-pre-wrap">{description}</p>

      <Links discordId={discordId} />

      {lanyard?.listening_to_spotify && <Spotify spotify={lanyard.spotify!} />}

      <TechStack />
    </div>
  );
}
