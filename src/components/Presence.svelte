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
  online: 'text-emerald-500',
  idle: 'text-amber-500',
  dnd: 'text-red-500',
  offline: 'text-slate-500',
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
