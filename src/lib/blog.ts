import type Post from '$lib/interfaces/Post';

interface SinglePostResponse {
    success: boolean;
    post?: Post;
}

interface AllPostsResponse {
    success: boolean;
    posts?: Post[];
}

function getElement(document: Document, tag: string): string {
    return document.getElementsByTagName(tag)[0].childNodes[0].nodeValue ?? '';
}

function getElementHTML(document: Document, tag: string): string {
    return document.getElementsByTagName(tag)[0].innerHTML;
}

async function processPost(post: Response, file: string): Promise<Post> {
    const document = new DOMParser().parseFromString(await post.text(), 'text/xml');

    const title = getElement(document, 'title');
    const id = title
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
    const date = getElement(document, 'date');
    const preview = getElement(document, 'preview');

    // Get the multiline content
    // Add a line break after each line, except for the first one
    const content = getElementHTML(document, 'content')
        .replace(/\n/g, '<br />')
        .replace('<br />', '');

    // Limit the content to 200 characters
    const shortenedContent = content.substring(0, 200) + (content.length > 200 ? '...' : '');
    // Limit the title to 50 characters
    const shortenedTitle = title.substring(0, 50) + (title.length > 50 ? '...' : '');

    return {
        id,
        title,
        date,
        preview,
        content,
        shortenedContent,
        shortenedTitle,
        file
    };
}

const postsUrl = 'https://raw.githubusercontent.com/baxthus/blog/main/';

export async function getSinglePost(file: string): Promise<SinglePostResponse> {
    const post = await fetch(postsUrl + file);
    if (!post.ok) return { success: false };

    return { success: true, post: await processPost(post, file) };
}

export async function getAllPosts(): Promise<AllPostsResponse> {
    const res = await fetch(postsUrl + 'posts.json');
    if (!res.ok) return { success: false };

    const postList = (await res.json()) as string[];
    // Reverse so the newest post is first
    // postList.reverse();

    const postsResponse = await Promise.all(
        postList.map(async (post) => await fetch(postsUrl + post))
    );

    if (postsResponse.some((post) => !post.ok)) return { success: false };

    const posts = await Promise.all(
        postsResponse.map(async (post, index) => await processPost(post, postList[index]))
    );

    return { success: true, posts };
}
