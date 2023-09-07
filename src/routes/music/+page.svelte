<script lang="ts">
	import Back from '$lib/components/Back.svelte';
	import type { IMusic } from '$lib/interfaces/Music';
	import { getMusics } from '$lib/music';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	let musics: Array<IMusic> = [];
	let musicsStatus: 'loading' | 'error' | 'success' = 'loading';

	onMount(async () => {
		const res = await getMusics();
		if (!res.success) {
			musicsStatus = 'error';
			return;
		}
		const rawMusics = res.musics ?? [];

		// Randomize the array using the Schwartzian transform
		musics = rawMusics
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);

		musicsStatus = 'success';
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleError = (ev: any) => (ev.target.src = '/others/album-placeholder.png');
</script>

<div class="post-list m-7">
	<Back class="mb-1" />
	<div class="min-h-0 mt-4 mb-3 text-ctp-mauve">
		<div class="flex justify-center">an example of music i like to listen to</div>
		<div class="flex justify-center">(in random order)</div>
	</div>
	<div class="flex flex-col sm:flex-row sm:flex-wrap">
		{#if musicsStatus === 'loading'}
			<h1 class="text-2xl font-bold" transition:blur={{ duration: 300 }}>Loading...</h1>
		{:else if musicsStatus === 'error'}
			<h1 class="text-2xl font-bold" transition:blur={{ delay: 300, duration: 300 }}>
				Error loading posts
			</h1>
		{/if}
		{#each musics as music}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="bg-ctp-mantle border border-ctp-surface0 hover:bg-ctp-surface0 hover:cursor-pointer rounded my-3 mx-auto justify-center p-1 transition delay-100"
				transition:blur={{ delay: 300, duration: 300 }}
				on:click={() => window.open(music.url, '_blank')}
				role="button"
				tabindex="0"
			>
				<div class="m-1">
					{#if music.artwork}
						<img
							src={music.artwork}
							alt="album artwork"
							class="max-w-xs mb-1 mx-auto justify-center"
							on:error={handleError}
						/>
					{/if}
					<div class="truncate w-[33ch]">
						<h1 class="text-xl font-bold">{music.title}</h1>
						<!-- Ugly ass syntax -->
						{#if music.type === 'track'}
							<h2>{music.album}</h2>
							<h2>{music.artist}</h2>
						{:else if music.type === 'artist'}
							<br />
							<br />
						{:else if music.type === 'album'}
							<br />
							<h2>{music.artist}</h2>
						{/if}
					</div>
					<h2>{music.type.charAt(0).toUpperCase() + music.type.slice(1)}</h2>
				</div>
			</div>
		{/each}
	</div>
</div>
