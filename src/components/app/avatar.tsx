import { Badge, type BadgeProps, Avatar as RawAvatar } from '@heroui/react';

import type { LanyardData } from '@/lib/lanyard/types';

export function Avatar({ status }: { status: LanyardData['discord_status'] }) {
  const statusColor: Record<LanyardData['discord_status'], BadgeProps['color']> = {
    online: 'success',
    offline: 'default',
    idle: 'warning',
    dnd: 'danger',
  };

  return (
    <Badge.Anchor className="relative">
      <RawAvatar className="size-32 rounded-full">
        <RawAvatar.Image src="/avatar.jpeg" alt="Avatar" />
        <RawAvatar.Fallback>B</RawAvatar.Fallback>
      </RawAvatar>
      <Badge
        color={statusColor[status]}
        placement="bottom-right"
        className="absolute right-2 bottom-2"
      />
    </Badge.Anchor>
  );
}
