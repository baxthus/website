<script lang="ts">
    import { page } from '$app/stores';
    import { getSinglePost } from '$lib/blog';
    import type Post from '$lib/interfaces/Post';
    import { onMount } from 'svelte';

    const postFile = $page.params.slug;

    let post: Post;

    onMount(async () => {
        const res = await getSinglePost(postFile);
        if (!res.success) {
            document.body.getElementsByClassName('post-lint')[0].innerHTML =
                'Error loading post';
            return;
        }
        post = res.post as Post;
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
    <a href="." class="mb-3 block font-bold">◄ back</a>
    {#if post}
        <!-- TODO: handle preview image size -->
        {#if post.preview}
            <img src={post.preview} alt="post preview" />
        {/if}
        <h1 class="text-2xl font-bold">{post.title}</h1>
        <span class="text-lg">{post.date}</span>
        <br /><br />
        <div class="content">{@html post.content}</div>
    {:else}
        <div class="text-2xl font-bold">Loading</div>
    {/if}
</div>

<!-- tailwind is forcing me to do this -->
<style>
    .content :global(a) {
        @apply text-[#b4befe] hover:underline block font-bold;
    }
    .content :global(p a) {
        display: inline;
    }
    .content :global(h1) {
        display: block;
        font-size: 2em;
        margin-top: 0.67em;
        margin-bottom: 0.67em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
    .content :global(h2) {
        display: block;
        font-size: 1.5em;
        margin-top: 0.83em;
        /* margin-bottom: 0.83em; */
        margin-bottom: 0.3em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
    .content :global(h3) {
        display: block;
        font-size: 1.17em;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
    .content :global(h4) {
        display: block;
        font-size: 1em;
        margin-top: 1.33em;
        margin-bottom: 1.33em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
    .content :global(p) {
        display: block;
        /* margin-top: 1em; */
        margin-bottom: 1em;
        margin-left: 0;
        margin-right: 0;
    }
    .content :global(i) {
        font-style: italic;
    }
    .content :global(img) {
        margin-top: 1em;
    }
</style>
