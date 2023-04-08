<script lang="ts">
    import type { VSCodeData } from '$lib/richPresence';

    export let data: VSCodeData | undefined;
</script>

{#if data?.idling}
    <div class="flex flex-col items-start sm:items-end">
        <span class="font-bold">vs code</span>
        <span class="text-[#f5c2e7]">currently idling</span>
    </div>
{/if}
