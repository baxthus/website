import type Post from './interfaces/Post';

interface getSinglePostResponse {
    success: boolean;
    post?: Post;
}

interface PostsResponse {
    success: boolean;
    posts?: Array<Post>;
}

async function getPost(post: Response, file: string): Promise<Post> {
    const coolDocument = new DOMParser().parseFromString(await post.text(), 'text/xml');

    const title = coolDocument.getElementsByTagName('title')[0].childNodes[0].nodeValue ?? '';
    const rawId = coolDocument.getElementsByTagName('title')[0].childNodes[0].nodeValue ?? '';
    const id = rawId.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    // Get the multiline content of the post.
    // Add a line break to the new lines, except for the first one.
    const rawContent = coolDocument.getElementsByTagName('content')[0].innerHTML ?? '';
    const content = rawContent.replace(/\n/g, '<br />').replace('<br />', '');

    // Limit the content to 100 characters
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
        preview: undefined,
    };
}

export async function getSinglePost(file: string): Promise<getSinglePostResponse> {
    const post = await fetch(`https://raw.githubusercontent.com/Abysm0xC/blog/main/${file}`);
    if (post.status !== 200) return { success: false };

    return {
        success: true,
        post: await getPost(post, file),
    };
}

export async function getPosts(): Promise<PostsResponse> {
    const res = await fetch('https://raw.githubusercontent.com/Abysm0xC/blog/main/posts.json');
    if (res.status !== 200) {
        return { success: false };
    }
    const postList = await res.json() as Array<string>;
    postList.reverse();

    const postsResponse = postList.map(async (post) => {
        return await fetch(`https://raw.githubusercontent.com/Abysm0xC/blog/main/${post}`);
    });

    const postsPromised = Promise.all(postsResponse).then((posts) => {
        return posts.map(async (post): Promise<Post> => getPost(post, postList[posts.indexOf(post)]));
    });

    return {
        success: true,
        posts: await Promise.all(await postsPromised),
    };
}