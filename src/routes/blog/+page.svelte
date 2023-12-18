<script lang="ts">
    import type Post from '$lib/interfaces/Post';
    import { onMount } from 'svelte';
    import { getAllPosts } from '$lib/blog';
    import Back from '$lib/components/Back.svelte';
    import { blur } from 'svelte/transition';

    let posts: Array<Post> = [];
    let postsStatus: 'loading' | 'error' | 'success' = 'loading';

    onMount(async () => {
        const res = await getAllPosts();
        if (!res.success) {
            postsStatus = 'error';
            return;
        }

        posts = res.posts ?? [];
        // Reverse the posts so that the newest posts are at the top
        posts.reverse();
        postsStatus = 'success';
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=inter:400,700&display=swap" />
</svelte:head>

<div class="content-section">
    <div class="main-content w-full">
        <Back />
        {#key postsStatus}
            <div
                in:blur={{ duration: 300, delay: 300 }}
                out:blur={{ duration: 300 }}
                class="main-content"
            >
                {#if postsStatus === 'loading'}
                    <h1>Loading...</h1>
                {:else if postsStatus === 'error'}
                    <h1>Error loading posts</h1>
                {/if}
                {#each posts as post}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="content-element"
                        on:click={() => (window.location.href = `/blog/${post.file}`)}
                        role="button"
                        tabindex="0"
                    >
                        {#if post.preview}
                            <img
                                class="mb-1 flex w-3/5 md:w-1/3"
                                src={post.preview}
                                alt="post preview"
                            />
                        {/if}
                        <h1>{post.shortenedTitle}</h1>
                        <h2>{post.date}</h2>
                        <br />
                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                        <div>{@html post.shortenedContent}</div>
                    </div>
                {/each}
            </div>
        {/key}
    </div>
</div>

<style lang="postcss">
    h1 {
        @apply text-2xl font-bold;
    }

    h2 {
        @apply text-xl font-semibold;
    }
</style>
