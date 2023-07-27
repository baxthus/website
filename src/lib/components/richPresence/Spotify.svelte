<script lang="ts">
    import type { LanyardData } from 'sk-lanyard';

    export let data: LanyardData;

    const getLink = (track_id: string) =>
        `https://open.spotify.com/track/${track_id}`;
</script>

{#if data?.spotify}
    <div class="flex flex-col items-start sm:items-end">
        <h1 class="font-bold">listening to</h1>
        <span class="text-[#f5c2e7]"
            ><a
                href={getLink(data.spotify.track_id)}
                target="_blank"
                rel="noreferrer"
                class="hover:underline">{data.spotify.song}</a
            ></span
        >
        <span class="text-[#89dceb]"
            >{data.spotify.artist.replaceAll(';', ',')}</span
        >
        <span class="text-[#94e2d5]">{data.spotify.album}</span>
        <a
            href={getLink(data.spotify.track_id)}
            target="_blank"
            rel="noreferrer"
        >
            <img
                src={data.spotify.album_art_url.replace(
                    'spotify:',
                    'https://i.scdn.co/image/',
                )}
                alt="Album cover"
                class="w-36 mt-1"
            />
        </a>
    </div>
{/if}
