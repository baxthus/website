<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/app.css';
	import { fly } from 'svelte/transition';

	export let data;

	// prettier-ignore
	onMount(() => {
        onblur = () => {
            document.body.className = 'bg-ctp-base motion-safe:transition-colors motion-safe:duration-300';
        };
        
        onfocus = () => {
            document.body.className = 'bg-ctp-crust motion-safe:transition-colors motion-safe:duration-300';
        };
    });
</script>

<svelte:head>
	<title>バクサス</title>

	<meta name="title" content="baxthus" />
	<meta name="description" content="BREATHE SMOKE WHERE THE AIR IS FRESH" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://abysmal.eu.org" />
	<meta property="og:title" content="baxthus" />
	<meta property="og:description" content="BREATHE SMOKE WHERE THE AIR IS FRESH" />
	<meta property="og:image" content="https://abysmal.eu.org/avatar.png" />

	<!-- Twitter / X -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="abysmal.eu.org" />
	<meta property="twitter:url" content="https://abysmal.eu.org" />
	<meta property="twitter:title" content="baxthus" />
	<meta property="twitter:description" content="BREATHE SMOKE WHERE THE AIR IS FRESH" />
	<meta property="twitter:image" content="https://abysmal.eu.org/avatar.png" />

	<link rel="preconnect" href="https://fonts.bunny.net" />
	<link
		rel="stylesheet"
		href="https://fonts.bunny.net/css?family=jetbrains-mono:400,700&display=swap"
	/>

	<!-- If you are looking for the favicon, it's in the app.html file -->
</svelte:head>

{#key data.url}
	<div in:fly={{ y: 200, duration: 300, delay: 300 }} out:fly={{ y: -200, duration: 300 }}>
		<slot />
	</div>
{/key}
