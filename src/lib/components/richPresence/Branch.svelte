<script lang="ts">
	export let name = '';
</script>

{#if name}
	<span class="text-ctp-text inline-block">
		on <span class="text-ctp-sky">  {name}</span>
	</span>
{/if}
