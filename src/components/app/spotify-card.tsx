import { Card, Link, ProgressBar, Tooltip } from '@heroui/react';
import { IconBrandSpotifyFilled } from '@tabler/icons-react';
import prettyMilliseconds from 'pretty-ms';
import { useEffect, useMemo, useState } from 'react';

import type { Spotify } from '@/lib/lanyard/types';

const formatTime = (ms: number) =>
  prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });

export default function SpotifyCard({ spotify }: { spotify: Spotify }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const internal = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(internal);
  }, []);

  const { progress, progressTooltip } = useMemo(() => {
    if (
      !spotify.timestamps.start ||
      !spotify.timestamps.end ||
      spotify.timestamps.end < spotify.timestamps.start
    )
      return { progress: 0, progressTooltip: '0:00 / 0:00' };

    const duration = spotify.timestamps.end - spotify.timestamps.start;
    const elapsed = Math.min(Math.max(now - spotify.timestamps.start, 0), duration);

    return {
      progress: (elapsed / duration) * 100,
      progressTooltip: `${formatTime(elapsed)} / ${formatTime(duration)}`,
    };
  }, [spotify.timestamps, now]);

  return (
    <Card className="w-full max-w-sm">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>Listening to Spotify</Card.Title>
          <Tooltip delay={0}>
            <Tooltip.Trigger>
              <IconBrandSpotifyFilled />
            </Tooltip.Trigger>
            <Tooltip.Content>Data may be outdated</Tooltip.Content>
          </Tooltip>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="flex gap-x-4">
          <Tooltip delay={0}>
            <Tooltip.Trigger className="shrink-0">
              <img src={spotify.album_art_url} alt={spotify.album} className="size-24 rounded-md" />
            </Tooltip.Trigger>
            <Tooltip.Content>{spotify.album}</Tooltip.Content>
          </Tooltip>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-full flex-col justify-center">
              <Link
                href={`https://open.spotify.com/track/${spotify.track_id}`}
                target="_blank"
                className="block max-w-full truncate text-base font-bold"
              >
                {spotify.song}
              </Link>
              <p className="truncate text-sm">{spotify.artist.split(';').join(', ')}</p>
            </div>
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <ProgressBar
                  aria-label="Music progress"
                  value={progress}
                  size="sm"
                  color="success"
                  className="mb-0.5"
                >
                  <ProgressBar.Track>
                    <ProgressBar.Fill />
                  </ProgressBar.Track>
                </ProgressBar>
                <Tooltip.Content>{progressTooltip}</Tooltip.Content>
              </Tooltip.Trigger>
            </Tooltip>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
