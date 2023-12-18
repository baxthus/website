<script lang="ts">
    import { onMount } from 'svelte';

    export let lang = '';
    let nodeVersion = 'loading...';

    interface NodeVersion {
        tag_name: string;
    }

    onMount(async () => {
        const res: Array<NodeVersion> = await (
            await fetch('https://api.github.com/repos/nodejs/node/releases?per_page=1')
        ).json();
        nodeVersion = res[0].tag_name;
    });

    const langs = ['js', 'jsx', 'ts', 'tsx', 'svelte', 'vue'];
</script>

{#if langs.includes(lang)}
    <span class="inline-block text-ctp-text">
        via <span class="text-ctp-teal"> node {nodeVersion}</span></span
    >
{/if}
