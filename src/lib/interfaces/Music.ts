export default interface Music {
    title?: string;
    album?: string;
    artist: string;
    url: string;
    type: 'track' | 'album' | 'artist';
    artwork?: string;
}
