<script setup lang="ts">
import type { LanyardData } from '~/types/lanyard';

const { data } = defineProps(['data']) as { data: LanyardData };

const now = ref(new Date().getTime());

setInterval(() => {
  now.value = new Date().getTime();
}, 1000);

function getProgress() {
  const start = data.spotify?.timestamps.start ?? new Date().getTime();
  const end = data.spotify?.timestamps.end ?? new Date().getTime();

  if (end <= start) return 0;

  const progress = ((now.value - start) / (end - start)) * 100;
  return Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0 and 100
}
</script>

<template>
  <Box>
    <template #title>
      Listening to Spotify
    </template>
    <div class="flex flex-row gap-x-4">
      <img
        v-tooltip.top="{
          value: data?.spotify?.album,
          autoHide: false,
        }"
        :src="data?.spotify?.album_art_url"
        alt="Album Art"
        class="rounded-lg h-24 w-24"
      >
      <div class="flex flex-col items-start justify-center gap-2 min-w-0">
        <a
          :href="'https://open.spotify.com/track/' + data?.spotify?.track_id"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="font-bold text-lg truncate w-full hover:text-green-400 hover:underline transition-colors cursor-pointer"
        >
          {{ data?.spotify?.song }}
        </a>
        <p class="truncate w-full">
          {{ data?.spotify?.artist.replace(/;/g, ', ') }}
        </p>
      </div>
    </div>
    <div class="flex flex-row items-center gap-x-2">
      <div class="w-full bg-subtext1 h-1 rounded-full">
        <div
          class="bg-violet-300 h-1 rounded-full"
          :style="{ width: getProgress() + '%' }"
        />
      </div>
    </div>
  </Box>
</template>
