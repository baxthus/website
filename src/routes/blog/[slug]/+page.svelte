<script lang="ts">
	import { page } from '$app/stores';
	import type { Post } from '$lib/interfaces/Blog';
	import { onMount } from 'svelte';
	import { getSinglePost } from '$lib/blog';
	import Back from '$lib/components/Back.svelte';
	import '$lib/styles/blog.css';
	import { blur } from 'svelte/transition';

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

<div class="m-2 font-inter">
	<Back class="mb-3" href="." />
	{#key postStatus}
		<div in:blur={{ delay: 300, duration: 300 }} out:blur={{ duration: 300 }}>
			{#if postStatus === 'success'}
				{#if post.preview}
					<img src={post.preview} alt="post preview" class="max-w-xs mb-1" />
				{/if}
				<h1 class="text-2xl font-bold">{post.title}</h1>
				<p class="text-lg">{post.date}</p>
				<br /><br />
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div class="content">{@html post.content}</div>
			{:else if postStatus === 'loading'}
				<div class="text-2xl font-bold">Loading...</div>
			{:else if postStatus === 'error'}
				<div class="text-2xl font-bold">Error loading post</div>
			{/if}
		</div>
	{/key}
</div>
