export interface IMusic {
	title?: string;
	album?: string;
	artist: string;
	url: string;
	type: 'track' | 'album' | 'artist';
	artwork: string;
}
