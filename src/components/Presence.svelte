<script lang="ts">
import { DISCORD_ID } from 'astro:env/client';
import { onMount } from 'svelte';
import { lanyardWS } from '@/lib/lanyard';
import type { LanyardData } from '@/lib/lanyard/types';
import Spotify from './Spotify.svelte';

let lanyard = $state<LanyardData>();
onMount(() =>
  lanyardWS({ socket: true, userId: DISCORD_ID, onPresenceUpdate: (data) => (lanyard = data) }),
);

const statusColor: Record<LanyardData['discord_status'], string> = {
  online: 'font-semibold text-emerald-700 dark:text-emerald-400',
  idle: 'font-semibold text-amber-700 dark:text-amber-400',
  dnd: 'font-semibold text-red-700 dark:text-red-400',
  offline: 'font-semibold text-slate-700 dark:text-slate-400',
};
</script>

<div class="space-y-3.5">
  <h3 class="font-bold">### Now</h3>
  {#if lanyard}
    <ul>
      <li>
        Currently <span class={statusColor[lanyard.discord_status]}>{lanyard.discord_status}</span>
      </li>
      <li>Location: {lanyard.kv.location}</li>
    </ul>
    <Spotify spotify={lanyard.spotify} />
  {:else}
    <p>Loading...</p>
  {/if}
</div>
