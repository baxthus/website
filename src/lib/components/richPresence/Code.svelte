<script lang="ts">
    import type { VSCodeData } from '$lib/richPresence';

    export let data: VSCodeData | undefined;
</script>

{#if data && !data.idling}
    <div class="flex flex-col items-start sm:items-end">
        <span class="font-bold">vs code</span>
        <span class="text-[#f5c2e7]"
            >{data.workspace?.replace(/[\u200B-\u200D\uFEFF]/g, '')}{data.branch
                ? `/${data.branch}`
                : ''}</span
        >
        <span>writing <span class="text-[#89dceb]">{data.lang}</span></span>
    </div>
{/if}
