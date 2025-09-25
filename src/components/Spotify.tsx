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

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function calculateProgress(
  currentTime: number,
  startTime: number,
  endTime: number,
): number {
  if (endTime <= startTime) return 0;
  const elapsed = currentTime - startTime;
  const duration = endTime - startTime;
  const progressPercent = (elapsed / duration) * 100;
  return Math.min(Math.max(progressPercent, 0), 100);
}

export default function Spotify({ spotify }: { spotify: Types.Spotify }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { start: startTime, end: endTime } = spotify.timestamps ?? {};
  const currentTime = now.getTime();

  const progress = useMemo(() => {
    if (!startTime || !endTime) return 0;
    return calculateProgress(currentTime, startTime, endTime);
  }, [currentTime, startTime, endTime]);

  const progressTooltip = useMemo(() => {
    if (!startTime || !endTime || endTime <= startTime) {
      return '0:00 / 0:00';
    }

    const elapsed = (progress / 100) * (endTime - startTime);
    const duration = endTime - startTime;

    return `${formatTime(elapsed)} / ${formatTime(duration)}`;
  }, [progress, startTime, endTime]);

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
              src={spotify.album_art_url || ''}
              alt={spotify.album || 'Album Art'}
              width={96}
              height={96}
              className="rounded-md"
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
                {spotify.artist?.split(';').join(', ')}
              </p>
            </div>
            <Tooltip content={progressTooltip}>
              <Progress
                aria-label="Song Progress"
                value={progress}
                size="sm"
                color="success"
                className="mt-2 mb-0.5"
              />
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
