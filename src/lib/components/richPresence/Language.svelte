<script lang="ts">
	import { onMount } from 'svelte';

	export let lang = '';
	let nodeVersion = 'loading...';

	onMount(async () => {
		const res = await (
			await fetch('https://api.github.com/repos/nodejs/node/releases?per_page=1')
		).json();
		nodeVersion = res[0].tag_name;
	});

	let langMap: Record<string, string>;
	const text = `<span class="text-ctp-teal"> node ${nodeVersion}</span>`;
	$: langMap = {
		js: text,
		ts: text,
		svelte: text
	};
</script>

{#if langMap[lang]}
	<span class="text-ctp-text inline-block"> via {@html langMap[lang]}</span>
{/if}
