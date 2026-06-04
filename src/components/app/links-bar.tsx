import { Button, Tooltip } from '@heroui/react';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLastfm,
  IconBrandSteam,
  IconBrandX,
  IconMail,
  type Icon,
} from '@tabler/icons-react';

import { env } from '@/env';
import { copyToClipboard } from '@/utils/copy';

type ButtonGroup = {
  title: string;
  content: string;
  icon: Icon;
  copy?: boolean;
}[];

const links: ButtonGroup = [
  { title: 'Email', content: 'baxt@baxt.dev', icon: IconMail, copy: true },
  { title: 'GitHub', content: 'https://github.com/baxthus', icon: IconBrandGithub },
  {
    title: 'Discord',
    content: `https://discord.com/users/${env.VITE_DISCORD_ID}`,
    icon: IconBrandDiscord,
  },
  { title: 'X', content: 'https://x.com/baxthus', icon: IconBrandX },
  { title: 'Steam', content: 'https://steamcommunity.com/id/baxthus', icon: IconBrandSteam },
  { title: 'Last.fm', content: 'https://last.fm/user/baxthus', icon: IconBrandLastfm },
];

export function LinksBar() {
  return (
    <div className="flex justify-center gap-x-1">
      {links.map((link) => (
        <Tooltip key={link.title}>
          <Tooltip.Trigger>
            {link.copy ? (
              <Button variant="ghost" isIconOnly onClick={() => copyToClipboard(link.content)}>
                <link.icon className="size-8" />
              </Button>
            ) : (
              <a href={link.content} target="_blank">
                <Button variant="ghost" isIconOnly>
                  <link.icon className="size-8" />
                </Button>
              </a>
            )}
          </Tooltip.Trigger>
          <Tooltip.Content>{link.content}</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
