<script lang="ts">
  import './layout.css';
  import { PUBLIC_URL } from '$app/env/public';
  import favicon from '$lib/assets/favicon.ico';
  import { logBanner } from '$lib/banner';
  import Footer from '$lib/components/footer.svelte';
  import Header from '$lib/components/header.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const title = 'baxthus';
  const description = 'BREATHE SMOKE WHERE THE AIR IS FRESH';

  onMount(() => logBanner());
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="icon" href={favicon} />
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={PUBLIC_URL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={favicon} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={PUBLIC_URL} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={favicon} />
</svelte:head>

<div class="mx-4 my-3.5 max-w-3xl space-y-3.5 md:mx-auto">
  <Header />
  {@render children()}
  <Footer />
</div>
