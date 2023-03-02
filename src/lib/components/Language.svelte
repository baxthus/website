<script lang="ts">
    export let lang = '';
    let nodeVersion: string;

    fetch('https://api.github.com/repos/nodejs/node/releases?per_page=1').then(
        (res) =>
            res.json().then((json) => {
                nodeVersion = json[0].tag_name;
            })
    );

    let langMap: Record<string, string>;
    $: langMap = {
        js: `<span class="text-[#94e2d5]"> node ${nodeVersion}`,
        ts: `<span class="text-[#94e2d5]"> node ${nodeVersion}`,
        svelte: `<span class="text-[#94e2d5]"> node ${nodeVersion}`,
    };
</script>

{#if langMap[lang]}
    <span class="text-[#cdd6f4] inline-block">
        via {@html langMap[lang]}
    </span>
{/if}
