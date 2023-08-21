<script lang="ts">
	import type { Post } from '$lib/interfaces/Blog';
	import { onMount } from 'svelte';
	import { getAllPosts } from '$lib/blog';
	import Back from '$lib/components/Back.svelte';

	let posts: Array<Post> = [];
	let postsStatus: 'loading' | 'error' | 'success' = 'loading';

	onMount(async () => {
		const res = await getAllPosts();
		if (!res.success) {
			postsStatus = 'error';
			return;
		}

		posts = res.posts ?? [];
		posts.reverse();
		postsStatus = 'success';
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.bunny.net" />
	<link rel="stylesheet" href="https://fonts.bunny.net/css?family=inter:400,700&display=swap" />
</svelte:head>

<div class="post-list m-2 font-inter">
	<Back class="mb-1" />
	{#if postsStatus === 'loading'}
		<h1 class="text-2xl bold">Loading...</h1>
	{:else if postsStatus === 'error'}
		<h1 class="text-2xl bold">Error loading posts</h1>
	{/if}
	{#each posts as post}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="bg-ctp-mantle border border-ctp-surface0 hover:cursor-pointer rounded my-2"
			on:click={() => (window.location.href = `/blog/${post.file}`)}
			role="button"
			tabindex="0"
		>
			<div class="m-1">
				{#if post.preview}
					<img src={post.preview} alt="post preview" class="max-w-xs mb-1" />
				{/if}
				<h1 class="text-xl bold">{post.shortenedTitle}</h1>
				<h2>{post.date}</h2>
				<br />
				<!-- It's a static site, I don't care about XSS -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div>{@html post.shortenedContent}</div>
			</div>
		</div>
	{/each}
</div>
