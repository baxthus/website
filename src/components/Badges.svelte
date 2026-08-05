<script lang="ts">
import { onMount } from 'svelte';

const IMAGE_PREFIX = '/88x31';

interface Badge {
  name: string;
  image: string;
  url?: string;
}

const badges: Badge[] = [
  { name: 'Made with Neovim', url: 'https://neovim.io', image: 'neovim.png' },
  { name: 'Made on Linux', url: 'https://www.linux.org', image: 'madeon_linux.gif' },
  { name: 'Powered by Cloudflare', url: 'https://www.cloudflare.com', image: 'cloudflare.png' },
  { name: 'Powered by Svelte', url: 'https://svelte.dev', image: 'svelte.png' },
  { name: 'Linux Now! (Xenia)', image: 'xenia-now.gif' },
  { name: 'No Cookie', image: 'nocookie.gif' },
  { name: 'Bi Flag', image: 'flag-bi.png' },
  { name: 'Best viewed with eyes', image: 'best_viewed_with_eyes.gif' },
  { name: 'Hacker Powered', image: 'hacker_powered.gif' },
  { name: 'CSS is awesome', image: 'css_is_awesome.png' },
  { name: 'HTML. Learn it today!', image: 'html_learn_it_today.png' },
  { name: 'Love Blahaj', image: 'love_blahaj.gif' },
  { name: 'Internet privacy now!', image: 'internet_privacy_now.gif' },
  { name: 'Made with CSS', image: 'made_with_css.gif' },
  { name: 'Have a smile!', image: 'have_a_smile.gif' },
  { name: 'got html?', image: 'got_html.gif' },
  {
    name: 'Free Tech Tips',
    url: 'https://www.youtube.com/@LinusTechTips',
    image: 'free_tech_tips.png',
  },
  { name: 'uBlock Origin now!', image: 'ublock_origin.png', url: 'https://ublockorigin.com' },
  { name: 'Powered by penguins', image: 'powered_by_penguins.png' },
  { name: 'Piracy now!', image: 'piracy_now.gif' },
  { name: 'Fire skull', image: 'fireskull.jpeg' },
  { name: 'I LIKE COMPUTER', image: 'i_like_computer.png' },
  { name: 'TypeScript', image: 'typescript.gif', url: 'https://www.typescriptlang.org' },
  { name: 'Powered by Bun', image: 'powered-by-bun.gif', url: 'https://bun.sh' },
  { name: 'Penguin Computing', image: 'penguin.gif' },
  { name: 'Half-Life', image: 'half-life.gif', url: 'https://www.half-life.com' },
  { name: 'I use Arch BTW', image: 'archlinux.gif', url: 'https://archlinux.org' },
  { name: 'git.gay', image: 'git-gay.png', url: 'https://git.gay' },
  { name: 'Use Rust Now!', image: 'rust.png', url: 'https://rust-lang.org' },
  { name: 'Powered by Astro', image: 'astro.png', url: 'https://astro.build' },
];

// fisher-yates shuffle
function shuffle(items: Badge[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

let marqueeBadges = $state<Badge[]>([]);

onMount(() => {
  const shuffled = shuffle(badges);

  // Duplicated so the second half lines up exactly with the first,
  // making the -50% -> 0% loop seamless instead of a jump-cut.
  marqueeBadges = [...shuffled, ...shuffled];
});
</script>

{#snippet image(badge: Badge)}
  <img
    src={`${IMAGE_PREFIX}/${badge.image}`}
    alt={badge.name}
    title={badge.name}
    class="h-8 w-22"
  />
{/snippet}

<div class="min-h-8 w-full overflow-hidden">
  {#if marqueeBadges.length > 0}
    <div class="flex w-max animate-marquee whitespace-nowrap">
      {#each marqueeBadges as badge}
        {#if badge.url}
          <a
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            class="mx-1 inline-block shrink-0"
          >
            {@render image(badge)}
          </a>
        {:else}
          <span class="mx-1 inline-block shrink-0"> {@render image(badge)} </span>
        {/if}
      {/each}
    </div>
  {:else}
    <div class="h-8" aria-hidden="true"></div>
  {/if}
</div>
