import type { IMusic } from './interfaces/Music';

interface MusicResponse {
	success: boolean;
	musics?: Array<IMusic>;
}

export async function getMusics(): Promise<MusicResponse> {
	const res = await fetch('https://cdn.abysmal.eu.org/musics.json');
	if (!res.ok) return { success: false };

	const rawMusics = (await res.json()) as Array<IMusic>;

	const musics = rawMusics.map(async (music) => {
		if (music.type === 'album') music.title = music.album;
		if (music.type === 'artist') music.title = music.artist;

		// if (!music.artwork)
		//     music.artwork = '/others/album-placeholder.png';

		return music;
	});

	return {
		success: true,
		musics: await Promise.all(musics) // I hate the way javascript promises works
	};
}
