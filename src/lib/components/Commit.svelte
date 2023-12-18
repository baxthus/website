<script lang="ts">
    import { onMount } from 'svelte';
    import { blur } from 'svelte/transition';
    import Link from '$lib/components/Link.svelte';

    interface Commit {
        object: {
            sha: string;
        };
    }

    let commit: string;

    onMount(async () => {
        const res: Commit = await (
            await fetch('https://api.github.com/repos/baxthus/website/git/refs/heads/main')
        ).json();
        commit = res.object.sha.slice(0, 7);
    });
</script>

{#if commit}
    <div transition:blur={{ duration: 300 }}>
        <Link href="https://github.com/baxthus/website/commit/{commit}">{commit}</Link>
    </div>
{/if}
