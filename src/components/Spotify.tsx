import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Progress,
  Tooltip,
} from '@heroui/react';
import { IconBrandSpotify } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { Types } from 'use-lanyard';

export default function Spotify({ spotify }: { spotify: Types.Spotify }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = useMemo(() => {
    const start = spotify.timestamps?.start ?? now;
    const end = spotify.timestamps?.end ?? now;

    if (end <= start) return 0;

    const progress = ((now.getTime() - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }, [now, spotify.timestamps]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-0">
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-sm font-medium">Listening to Spotify</p>
          <Tooltip content="Data may be outdated">
            <IconBrandSpotify size={20} />
          </Tooltip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex w-full flex-row gap-x-4">
          <Tooltip content={spotify.album}>
            <Image
              src={spotify.album_art_url ?? ''}
              alt={spotify.album ?? 'Album Art'}
              width={96}
              height={96}
            />
          </Tooltip>
          <div className="flex w-full min-w-0 flex-col">
            <div className="flex h-full flex-col justify-center">
              <Link
                color="foreground"
                underline="hover"
                href={`https://open.spotify.com/track/${spotify.track_id}`}
                target="_blank"
                className="block truncate font-bold"
              >
                {spotify.song}
              </Link>
              <p className="text-default-600 truncate text-sm">
                {spotify.artist?.replace(';', ', ')}
              </p>
            </div>
            <Progress
              aria-label="Song Progress"
              value={progress}
              size="sm"
              color="success"
              className="mt-2 mb-0.5"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
