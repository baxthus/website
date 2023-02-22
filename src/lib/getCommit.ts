interface ICommit {
    object: {
        sha: string;
    };
}

export default async function () {
    const res: ICommit = await (await fetch('https://api.github.com/repos/abysmal26/website/git/refs/heads/main')).json();
    return res.object.sha.slice(0, 7);
}