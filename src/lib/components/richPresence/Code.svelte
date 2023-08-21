<script lang="ts">
	import type { VSCodeData } from '$lib/richPresence';

	export let data: VSCodeData | undefined;
</script>

{#if data}
	<div class="flex flex-col items-start sm:items-end">
		<span class="font-bold">vs code</span>
		{#if data.idling}
			<span class="text-ctp-pink">currently idling</span>
		{:else}
			<span class="text-ctp-pink">
				{data.workspace?.replace(/[\u200B-\u200D\uFEFF]/g, '')}{data.branch
					? `/${data.branch}`
					: ''}
			</span>
		{/if}
	</div>
{/if}
