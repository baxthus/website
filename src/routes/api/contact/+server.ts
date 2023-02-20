import type { RequestHandler, RequestEvent } from '@sveltejs/kit';
import type Contact from '$lib/types/contact';
import { CONTACT_WEBHOOK } from '$env/static/private';

interface Embed {
    title: string;
    description: string;
    color: number;
    fields: Array<{
        name: string;
        value: string;
    }>;
}

interface Body {
    username: string
    avatar_url: string
    embeds: Array<Embed>
}

export const POST: RequestHandler = async ({ request }: RequestEvent): Promise<Response> => {
    const content: Contact = await request.json();

    if (!content.originURL ||
        !content.inputName ||
        !content.inputEmail ||
        !content.inputMessage
    ) {
        return new Response(JSON.stringify({ success: false }));
    }

    const embed: Embed = {
        title: 'Contact Form',
        description: `From ${content.originURL} at <t:${String(Date.now() / 1000).split('.')[0]}:f>`,
        color: 13346551,
        fields: [
            {
                name: ':bust_in_silhouette: **Name**',
                value: `\`${content.inputName}\``,
            },
            {
                name: ':envelope: **Email**',
                value: `\`${content.inputEmail}\``,
            },
            {
                name: ':page_facing_up: **Message**',
                value: `\`\`\`${content.inputMessage}\`\`\``,
            },
        ],
    };

    const body: Body = {
        username: 'Contact Form',
        avatar_url: 'https://abysmal.eu.org/avatar.png',
        embeds: [embed],
    };

    try {
        await fetch(CONTACT_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    } catch {
        return new Response(JSON.stringify({ success: false }));
    }

    return new Response(JSON.stringify({ success: true }));
};