export interface Post {
    title: string;
    id: string;
    file: string;
    date: string;
    content: string;
    shortenedContent: string;
    shortenedTitle: string;
    preview?: string;
}