<script lang="ts">
    import type { Data } from 'lanyard-wrapper';
    import { blur } from 'svelte/transition';
    import Link from '$lib/components/Link.svelte';

    export let data: Data;

    const getLink = (trackId?: string) => `https://open.spotify.com/track/${trackId}`;
</script>

{#if data?.spotify}
    <div transition:blur={{ duration: 300 }}>
        {#key data.spotify.track_id}
            <div
                class="to-the-side"
                in:blur={{ delay: 300, duration: 300 }}
                out:blur={{ duration: 300 }}
            >
                <h1 class="font-bold">listening to</h1>
                <Link href={getLink(data.spotify.track_id)} class="text-ctp-pink">
                    {data.spotify.song}
                </Link>
                <span class="text-ctp-blue">{data.spotify.artist.replaceAll(';', ',')}</span>
                <span class="text-ctp-teal">{data.spotify.album}</span>
                <Link href={getLink(data.spotify.track_id)}>
                    <img
                        src={data.spotify.album_art_url.replace(
                            'spotify:',
                            'https://i.scdn.co/image/'
                        )}
                        alt="Album cover"
                        class="mt-1 w-36"
                    />
                </Link>
            </div>
        {/key}
    </div>
{/if}
