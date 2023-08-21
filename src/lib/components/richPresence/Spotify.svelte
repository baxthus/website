<script lang="ts">
	import type { Data } from '$lib/richPresence';
	import Link from '$lib/components/Link.svelte';

	export let data: Data;

	const getLink = (track_id: string | null) => `https://open.spotify.com/track/${track_id}`;
</script>

{#if data?.spotify}
	<div class="flex flex-col items-start sm:items-end">
		<h1 class="font-bold">listening to</h1>
		<Link href={getLink(data.spotify.track_id)} class="text-ctp-pink">{data.spotify.song}</Link>
		<span class="text-ctp-sky">{data.spotify.artist.replaceAll(';', ',')}</span>
		<span class="text-ctp-teal">{data.spotify.album}</span>
		<Link href={getLink(data.spotify.track_id)}>
			<img
				src={data.spotify.album_art_url?.replace('spotify:', 'https://i.scdn.co/image/')}
				alt="Album cover"
				class="w-36 mt-1"
			/>
		</Link>
	</div>
{/if}
