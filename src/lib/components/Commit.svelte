<script lang="ts">
    import { onMount } from 'svelte';

    interface Commit {
        object: {
            sha: string;
        };
    }

    let commit: string;

    onMount(async () => {
        const res: Commit = await (
            await fetch(
                'https://api.github.com/repos/baxthus/website/git/refs/heads/main',
            )
        ).json();
        commit = res.object.sha.slice(0, 7);
    });
</script>

{#await commit}
    <div>Loading...</div>
{:then}
    <div>
        <a
            href="https://github.com/baxthus/website/commit/{commit}"
            target="_blank"
            rel="noreferrer"
            class="text-[#b4befe] hover:underline">{commit}</a
        >
    </div>
{/await}
