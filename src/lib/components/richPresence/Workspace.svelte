<script lang="ts">
	export let workspace = '';
</script>

{#if workspace}
	<span class="text-ctp-text inline-block">
		in <span class="text-ctp-pink">{workspace.replace(/[\u200B-\u200D\uFEFF]/g, '')}</span>
	</span>
{/if}
