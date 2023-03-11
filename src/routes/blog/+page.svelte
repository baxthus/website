<script lang="ts">
    import { getPosts } from '$lib/blog';
    import type Post from '$lib/interfaces/Post';
    import { onMount } from 'svelte';

    let posts: Array<Post> = [];

    onMount(async () => {
        const res = await getPosts();
        if (!res.success) {
            document.body.getElementsByClassName('post-lint')[0].innerHTML =
                'Error loading posts';
            return;
        }
        posts = res.posts ?? [];
        posts.reverse();
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
        rel="stylesheet"
        href="https://fonts.bunny.net/css?family=inter:400,700&display=swap"
    />
</svelte:head>

<div class="m-2 font-[Inter]">
    <a href=".." class="mb-1 block font-bold">◄ back</a>
    {#if !posts.length}
        <h1 class="text-2xl bold">Loading...</h1>
    {/if}
    {#each posts as post}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="bg-[#181825] border border-[#313244] hover:cursor-pointer rounded my-2"
            on:click={() => (window.location.href = `/blog/${post.file}`)}
        >
            <div class="m-1">
                {#if post.preview}
                    <img src={post.preview} alt="post icon" />
                {/if}
                <h1 class="text-xl font-bold">{post.shortenedTitle}</h1>
                <h2>{post.date}</h2>
                <br />
                <div>{@html post.shortenedContent}</div>
            </div>
        </div>
    {/each}
</div>
