import type { Post } from './interfaces/Blog';

interface SinglePostResponse {
    success: boolean;
    post?: Post;
}

interface AllPostsResponse {
    success: boolean;
    posts?: Array<Post>;
}

async function processPost(post: Response, file: string): Promise<Post> {
    const coolDocument = new DOMParser().parseFromString(await post.text(), 'text/xml');

    const title = coolDocument.getElementsByTagName('title')[0].childNodes[0].nodeValue ?? '';
    const id = title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    const preview = coolDocument.getElementsByTagName('preview')[0].childNodes[0].nodeValue ?? undefined;
    // Get the multiline content of the post.
    // Add a line break to the new lines, except for the first one.
    const rawContent = coolDocument.getElementsByTagName('content')[0].innerHTML ?? '';
    const content = rawContent.replace(/\n/g, '<br />').replace('<br />', '');

    // Limit the content to 200 characters
    const shortenedContent = content.substring(0, 200) + (content.length > 200 ? '...' : '');
    // Limit the title to 50 characters
    const shortenedTitle = title.substring(0, 50) + (title.length > 50 ? '...' : '');

    return {
        title,
        id,
        file,
        date: coolDocument.getElementsByTagName('date')[0].childNodes[0].nodeValue ?? '',
        content,
        shortenedContent,
        shortenedTitle,
        preview,
    };
}

export async function getSinglePost(file: string): Promise<SinglePostResponse> {
    const post = await fetch(`https://raw.githubusercontent.com/Abysm0xC/blog/main/${file}`);
    if (post.status !== 200) return { success: false };

    return {
        success: true,
        post: await processPost(post, file),
    };
}

export async function getAllPosts(): Promise<AllPostsResponse> {
    const res = await fetch('https://raw.githubusercontent.com/Abysm0xC/blog/main/posts.json');
    if (res.status !== 200) return { success: false };

    const postList = await res.json() as Array<string>;
    postList.reverse();

    const postsResponse = postList.map(async (post): Promise<Response> => {
        return await fetch(`https://raw.githubusercontent.com/Abysm0xC/blog/main/${post}`);
    });

    const postsPromised = await Promise.all(postsResponse);

    if (postsPromised.some((post) => post.status !== 200)) return { success: false };

    const posts = postsPromised.map(async (post): Promise<Post> => {
        return processPost(post, postList[postsPromised.indexOf(post)])
    });

    return {
        success: true,
        posts: await Promise.all(posts),
    };
}