import { useEffect, useState } from 'react';

import type { LanyardData } from '@/lib/lanyard/types';

const BAR_LENGTH = 20;
const BAR_LENGTH_SM = 10;

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function useNow(active: boolean) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active]);
  return now;
}

function makeBar(progress: number, length: number) {
  const filled = Math.round(progress * length);
  return '#'.repeat(filled) + '-'.repeat(length - filled);
}

export function Spotify({ spotify }: { spotify: LanyardData['spotify'] }) {
  const now = useNow(Boolean(spotify));

  if (!spotify) return <p>Not listening to anything</p>;

  const { start, end } = spotify.timestamps;
  const hasProgress = Boolean(start && end);
  // oxlint-disable-next-line typescript/no-extra-non-null-assertion typescript/no-non-null-assertion
  const duration = hasProgress ? end!! - start : 0;
  const elapsed = hasProgress ? Math.min(Math.max(now - start, 0), duration) : 0;
  const progress = hasProgress ? elapsed / duration : 0;
  const label = `${formatTime(elapsed)} / ${formatTime(duration)}`;

  return (
    <div className="flex items-center gap-x-4">
      <img
        src={spotify.album_art_url}
        alt={spotify.album}
        title={spotify.album}
        className="size-24 shrink-0"
      />
      <div className="relative h-24 min-w-0 flex-1">
        <div className="flex h-full flex-col justify-center">
          <a
            href={`https://open.spotify.com/track/${spotify.track_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate"
          >
            {spotify.song}
          </a>
          <p className="truncate">{spotify.artist.split(';').join(', ')}</p>
        </div>
        <p className="absolute inset-x-0 bottom-0 truncate text-sm opacity-70" title={label}>
          <span className="min-[420px]:hidden">[{makeBar(progress, BAR_LENGTH_SM)}]</span>
          <span className="hidden min-[420px]:inline">[{makeBar(progress, BAR_LENGTH)}]</span>{' '}
          {label}
        </p>
      </div>
    </div>
  );
}
