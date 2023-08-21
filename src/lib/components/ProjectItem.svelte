<script lang="ts">
	import Link from '$lib/components/Link.svelte';

	export let href: string;
	export let name: string;
	export let description: string | undefined = undefined;
	export let newTab = true;
</script>

<li>
	<Link {href} {newTab}>{name}</Link>
	{#if description}
		<span class="text-ctp-text">- {description}</span>
	{/if}
</li>
