import type Music from '$lib/interfaces/Music';

interface MusicResponse {
    success: boolean;
    musics?: Array<Music>;
}

export async function getMusics(): Promise<MusicResponse> {
    const response = await fetch('https://cdn.abysmal.eu.org/musics.json');
    if (!response.ok) return { success: false };

    const rawResponse = (await response.json()) as Music[];

    const promisedMusics = rawResponse.map(async (music) => {
        switch (music.type) {
            case 'album':
                music.title = music.album;
                break;
            case 'artist':
                music.title = music.artist;
                break;
        }

        if (!music.artwork) music.artwork = '/others/album-placeholder.png';

        return music;
    });

    const rawMusics = await Promise.all(promisedMusics);

    // Randomize the array using the Schwartzian transform
    const musics = rawMusics
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    return { success: true, musics };
}
