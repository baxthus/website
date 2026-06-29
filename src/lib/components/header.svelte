<script lang="ts">
  const links: {
    name: string;
    to: string;
  }[] = [
    { name: 'home', to: '/' },
    { name: 'blog', to: '/blog' },
  ];
</script>

<header class="flex justify-between">
  <h1 class="block font-bold after:-mt-1.5 after:block after:content-['=======']">baxthus</h1>
  <div class="flex h-fit">
    {#each links as link}
      <a class="font-bold" href={link.to}>{link.name}</a>
      {#if link !== links[links.length - 1]}
        <span class="mx-2 font-bold">|</span>
      {/if}
    {/each}
  </div>
</header>
