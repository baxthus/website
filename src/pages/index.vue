<script setup lang="ts">
import { IconBrandDiscord, IconBrandGithub, IconBrandLastfm, IconBrandSteam, IconBrandX, IconKey, IconMail, IconMapPin, IconMoneybag, type Icon } from '@tabler/icons-vue';
import TechStack from '~/components/TechStack.vue';
import type { LanyardData } from '~/types/lanyard';

const data = ref<LanyardData>();

const toast = useToast();

onMounted(() => {
  useLanyard({
    userId: '505432621086670872',
    socket: true,
    onPresenceUpdate: presence => data.value = presence as LanyardData,
  });
});

const description = ref(`
BREATHE SMOKE WHERE THE AIR IS FRESH
Full-Stack Developer (in my dreams)
`);

const links = ref<Array<{ title: string; icon: Icon; content?: string; copy?: boolean; action?: () => void }>>([
  { title: 'Email', content: 'baxt@baxt.fun', icon: IconMail, copy: true },
  { title: 'X', content: 'https://x.com/baxthus', icon: IconBrandX },
  { title: 'Github', content: 'https://github.com/baxthus', icon: IconBrandGithub },
  { title: 'Steam', content: 'https://steamcommunity.com/id/baxthus', icon: IconBrandSteam },
  { title: 'Discord', content: 'https://discord.com/users/505432621086670872', icon: IconBrandDiscord },
  { title: 'Last.fm', content: 'https://www.last.fm/user/baxthus', icon: IconBrandLastfm },
  { title: 'PGP Keys', content: 'https://keybase.io/baxthus/pgp_keys.asc', icon: IconKey },
  { title: 'Donate', icon: IconMoneybag, action: () => donationVisible.value = true },
]);

const location = computed(() => data.value?.kv?.location ?? 'Earth');
const locationUrl = computed(() => new URL(`https://www.google.com/maps/search/?api=1&query=${location.value}`).href);

const donationVisible = ref(false);

const avatarDelay = 0.1;
const nameDelay = 0.2;
const locationDelay = 0.3;
const descriptionDelay = 0.4;
const linksDelay = 0.5;
const spotifyDelay = 0.6;
const activitiesDelay = 0.7;
const techStackDelay = 0.8;
</script>

<template>
  <div class="flex flex-col p-4 gap-6 max-w-full">
    <div class="flex flex-col items-center gap-4">
      <Motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.5, delay: avatarDelay }"
      >
        <div class="relative">
          <img src="/avatar.jpg" alt="Avatar" class="rounded-full size-32">
          <div
            v-if="data?.discord_status && data?.discord_status !== 'offline'"
            class="absolute bottom-0 right-0 text-white text-xs font-bold rounded-full px-2 py-1 border-4 border-primary-contrast"
            :class="{
              'bg-green-500': data?.discord_status === 'online',
              'bg-yellow-500': data?.discord_status === 'idle',
              'bg-red-500': data?.discord_status === 'dnd',
            }"
          >
            {{ data?.discord_status ?? 'offline' }}
          </div>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: nameDelay }"
      >
        <h1 class="font-bold text-4xl">
          baxthus
        </h1>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: locationDelay }"
      >
        <Button
          as="a"
          :href="locationUrl"
          target="_blank"
          rel="noopener noreferrer nofollow"
          severity="secondary"
          size="small"
          rounded
        >
          <IconMapPin />
          <span class="pt-0.5">{{ location }}</span>
        </Button>
      </Motion>

      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.5, delay: descriptionDelay }"
      >
        <div class="w-full ring-0 block">
          <p class="break-words whitespace-pre-line text-center">
            {{ description.trim() }}
          </p>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 15 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: linksDelay }"
      >
        <div class="flex flex-row flex-wrap items-center justify-center">
          <Button
            v-for="link in links"
            :key="link.title"
            v-tooltip.bottom="{
              value: link.title,
              showDelay: 300,
            }"
            :as="link.copy ? 'button' : 'a'"
            :href="link.copy ? undefined : link.content"
            target="_blank"
            rel="noopener noreferrer nofollow"
            severity="contrast"
            variant="text"
            rounded
            @click="{
              if (link.action) link.action();
              if (link.copy) copyToClipboard(toast, link.content ?? '');
            }"
          >
            <template #icon>
              <component :is="link.icon" class="w-8 h-auto" />
            </template>
          </Button>
        </div>
      </Motion>

      <Motion
        v-if="data?.spotify"
        :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, delay: spotifyDelay }"
      >
        <Spotify :data />
      </Motion>

      <Motion
        :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, delay: activitiesDelay }"
      >
        <Activities :data />
      </Motion>
    </div>

    <Motion
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: techStackDelay }"
    >
      <TechStack />
    </Motion>
  </div>
  <Donation v-model:visible="donationVisible" />
</template>
