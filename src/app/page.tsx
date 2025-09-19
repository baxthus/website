'use client';
import { Avatar, Button, Tooltip, type ButtonProps } from '@heroui/react';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLastfm,
  IconBrandSteam,
  IconBrandX,
  IconCode,
  IconMail,
  IconMapPin,
} from '@tabler/icons-react';
import { useLanyardWS, type Types } from 'use-lanyard';
import copyToClipboard from '@/utils/copyToClipboard';
import { createElement } from 'react';
import Donation from '@/components/Donation';
import type { ButtonGroup } from '@/types/button-group';
import Spotify from '@/components/Spotify';

const discordId = process.env.NEXT_PUBLIC_DISCORD_ID as Types.Snowflake;

const description = `
BREATHE SMOKE WHERE THE AIR IS FRESH
Full-Stack Developer (in my dreams)
`.trim();

const links: ButtonGroup = [
  { title: 'Email', content: 'baxt@baxt.fun', icon: IconMail, copy: true },
  { title: 'X', content: 'https://x.com/baxthus', icon: IconBrandX },
  {
    title: 'GitHub',
    content: 'https://github.com/baxthus',
    icon: IconBrandGithub,
  },
  {
    title: 'Steam',
    content: 'https://steamcommunity.com/id/baxthus',
    icon: IconBrandSteam,
  },
  {
    title: 'Discord',
    content: `https://discord.com/users/${discordId}`,
    icon: IconBrandDiscord,
  },
  {
    title: 'Last.fm',
    content: 'https://www.last.fm/user/baxthus',
    icon: IconBrandLastfm,
  },
];

export default function Home() {
  const lanyard = useLanyardWS(discordId);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Avatar
        className="text-large size-32"
        src={
          lanyard?.discord_user?.avatar
            ? `https://cdn.discordapp.com/avatars/${discordId}/${lanyard?.discord_user.avatar}.png?size=256`
            : undefined
        }
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
        fallback={<IconCode size={64} />}
        showFallback={true}
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

      <div className="flex flex-wrap justify-center">
        {links.map(({ title, content, icon, action, copy }) => (
          <Tooltip key={title} content={title}>
            <Button
              as={copy ? 'button' : 'a'}
              href={content}
              target="_blank"
              isIconOnly
              variant="light"
              onPress={() => {
                if (action) action();
                if (copy && content) copyToClipboard(content);
              }}
            >
              {createElement(icon, { size: 32 })}
            </Button>
          </Tooltip>
        ))}
        <Donation />
      </div>

      {lanyard?.listening_to_spotify && <Spotify spotify={lanyard.spotify!} />}

      <p className="p-4">Coming soon...</p>
    </div>
  );
}
