<script lang="ts">
    import type Music from '$lib/interfaces/Music';
    import { onMount } from 'svelte';
    import { getMusics } from '$lib/music';
    import Back from '$lib/components/Back.svelte';
    import { blur } from 'svelte/transition';

    let musics: Array<Music> = [];
    let musicsStatus: 'loading' | 'error' | 'success' = 'loading';

    onMount(async () => {
        const res = await getMusics();
        if (!res.success) {
            musicsStatus = 'error';
            return;
        }
        musics = res.musics ?? [];
        musicsStatus = 'success';
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleError = (ev: any) => (ev.target.src = '/others/album-placeholder.png');
</script>

<div class="content-section">
    <div class="main-content w-full">
        <Back />
        <div class="text-center text-ctp-mauve">
            <div>an example of music i like to listen to</div>
            <div>(rarely updated)</div>
        </div>
        {#key musicsStatus}
            <div
                class="flex flex-col sm:flex-row sm:flex-wrap"
                in:blur={{ duration: 300, delay: 300 }}
                out:blur={{ duration: 300 }}
            >
                {#if musicsStatus === 'loading'}
                    <h1>loading...</h1>
                {:else if musicsStatus === 'error'}
                    <h1>error loading posts</h1>
                {/if}
                {#each musics as music}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="content-element mx-auto my-3"
                        on:click={() => window.open(music.url, '_blank')}
                        role="button"
                        tabindex="0"
                    >
                        {#if music.artwork}
                            <img
                                src={music.artwork}
                                alt="album artwork"
                                class="mx-auto mb-1 h-80 max-w-xs"
                                on:error={handleError}
                            />
                        {/if}
                        <div class="w-[33ch]">
                            <h1 class="truncate text-ellipsis">{music.title}</h1>

                            <!-- Ugly hack to make the layout work -->
                            {#if music.type === 'track'}
                                <div>{music.album}</div>
                                <div>{music.artist}</div>
                            {:else if music.type === 'artist'}
                                <br />
                                <br />
                            {:else if music.type === 'album'}
                                <br />
                                <div>{music.artist}</div>
                            {/if}
                            {music.type.charAt(0).toUpperCase() + music.type.slice(1)}
                        </div>
                    </div>
                {/each}
            </div>
        {/key}
    </div>
</div>

<style lang="postcss">
    h1 {
        @apply text-xl font-bold;
    }

    .content-element div,
    .content-element h1 {
        @apply truncate text-ellipsis;
    }
</style>
