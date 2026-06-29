<script lang="ts">
  import type { LanyardData } from '$lib/lanyard/types';

  const BAR_LENGTH = 20;
  const BAR_LENGTH_SM = 10;

  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  function makeBar(progress: number, length: number) {
    const filled = Math.round(progress * length);
    return '#'.repeat(filled) + '-'.repeat(length - filled);
  }

  let { spotify }: { spotify: LanyardData['spotify'] } = $props();

  let now = $state(Date.now());

  $effect(() => {
    if (!spotify) return;
    const id = setInterval(() => {
      now = Date.now();
    }, 1000);
    return () => clearInterval(id);
  });

  const hasProgress = $derived(Boolean(spotify?.timestamps.start && spotify?.timestamps.end));
  const duration = $derived(hasProgress ? spotify!.timestamps.end! - spotify!.timestamps.start : 0);
  const elapsed = $derived(
    hasProgress ? Math.min(Math.max(now - spotify!.timestamps.start, 0), duration) : 0,
  );
  const progress = $derived(hasProgress ? elapsed / duration : 0);
  const label = $derived(`${formatTime(elapsed)} / ${formatTime(duration)}`);
</script>

{#if spotify}
  <div class="flex items-center gap-x-4">
    <img
      src={spotify.album_art_url}
      alt={spotify.album}
      title={spotify.album}
      class="size-24 shrink-0"
    />
    <div class="relative h-24 min-w-0 flex-1">
      <div class="flex h-full flex-col justify-center">
        <a
          href="https://open.spotify.com/track/{spotify.track_id}"
          target="_blank"
          rel="noopener noreferrer"
          class="max-w-full truncate"
        >
          {spotify.song}
        </a>
        <p class="truncate">{spotify.artist.split(';').join(', ')}</p>
      </div>
      <p class="absolute inset-x-0 bottom-0 truncate text-sm opacity-70" title={label}>
        <span class="min-[420px]:hidden">[{makeBar(progress, BAR_LENGTH_SM)}]</span>
        <span class="hidden min-[420px]:inline">[{makeBar(progress, BAR_LENGTH)}]</span>
        {label}
      </p>
    </div>
  </div>
{:else}
  <p>Not listening to anything</p>
{/if}
