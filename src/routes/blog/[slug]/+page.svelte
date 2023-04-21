<script lang="ts">
    import { page } from '$app/stores';
    import { getSinglePost } from '$lib/blog';
    import Back from '$lib/components/Back.svelte';
    import type { Post } from '$lib/interfaces/Blog';
    import { onMount } from 'svelte';

    const postFile = $page.params.slug;

    let post: Post;
    let postStatus: 'loading' | 'error' | 'success' = 'loading';

    onMount(async () => {
        const res = await getSinglePost(postFile);
        if (!res.success) {
            postStatus = 'error';
            return;
        }

        post = res.post as Post;

        postStatus = 'success';
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
    <Back class="mb-3" href="." />
    {#if postStatus === 'success'}
        {#if post.preview}
            <img src={post.preview} alt="post preview" class="max-w-xs mb-1" />
        {/if}
        <h1 class="text-2xl font-bold">{post.title}</h1>
        <span class="text-lg">{post.date}</span>
        <br /><br />
        <div class="content">{@html post.content}</div>
    {:else if postStatus === 'loading'}
        <div class="text-2xl font-bold">Loading</div>
    {:else if postStatus === 'error'}
        <div class="text-2xl font-bold">Error loading post</div>
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
