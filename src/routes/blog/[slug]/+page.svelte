<script lang="ts">
    import { page } from '$app/stores';
    import type Post from '$lib/interfaces/Post';
    import { onMount } from 'svelte';
    import { getSinglePost } from '$lib/blog';
    import Back from '$lib/components/Back.svelte';
    import { blur } from 'svelte/transition';
    import '$lib/styles/blog.css';

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
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=inter:400,700&display=swap" />
</svelte:head>

<div class="content-section font-inter">
    <div class="main-content w-full">
        <Back href="." />
        {#key postStatus}
            <div
                in:blur={{ duration: 300, delay: 300 }}
                out:blur={{ duration: 300 }}
                class="break-all"
            >
                {#if postStatus === 'loading'}
                    <h1>Loading...</h1>
                {:else if postStatus === 'error'}
                    <h1>Error loading post</h1>
                {:else}
                    {#if post.preview}
                        <img src={post.preview} alt="Post preview" class="mb-1 max-w-xs" />
                    {/if}
                    <h1>{post.title}</h1>
                    <h2>{post.date}</h2>
                    <br />

                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    <div>{@html post.content}</div>
                {/if}
            </div>
        {/key}
    </div>
</div>

<style lang="postcss">
    h1 {
        @apply text-2xl font-bold;
    }

    h2 {
        @apply text-xl font-bold;
    }
</style>
