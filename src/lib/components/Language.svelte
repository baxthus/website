<script lang="ts">
    import { onMount } from 'svelte';

    export let lang = '';
    let nodeVersion: string = 'loading...';

    onMount(async () => {
        await fetch(
            'https://api.github.com/repos/nodejs/node/releases?per_page=1'
        ).then((res) =>
            res.json().then((json) => {
                nodeVersion = json[0].tag_name;
            })
        );
    });

    let langMap: Record<string, string>;
    const text = `<span class="text-[#94e2d5]"> node ${nodeVersion}</span>`;
    $: langMap = {
        js: text,
        ts: text,
        svelte: text,
    };
</script>

{#if langMap[lang]}
    <span class="text-[#cdd6f4] inline-block">
        via {@html langMap[lang]}
    </span>
{/if}
