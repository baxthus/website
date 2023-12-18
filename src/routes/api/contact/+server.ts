import type { RequestHandler } from '@sveltejs/kit';
import type Contact from '$lib/interfaces/Contact';
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
    username: string;
    avatar_url: string;
    embeds: Array<Embed>;
}

export const POST: RequestHandler = async ({ request }) => {
    const user: Contact = await request.json();

    if (!user.url || !user.name || !user.email || !user.message)
        return new Response(JSON.stringify({ success: false }), { status: 400 });

    const embed: Embed = {
        title: 'Contact Form',
        description: `From ${user.url} at <t:${Math.floor(Date.now() / 1000)}:f>`,
        color: 13346551,
        fields: [
            {
                name: ':bust_in_silhouette: **Name**',
                value: `\`${user.name}\``
            },
            {
                name: ':envelope: **Email**',
                value: `\`${user.email}\``
            },
            {
                name: ':page_facing_up: **Message**',
                value: `\`\`\`${user.message}\`\`\``
            }
        ]
    };

    const body: Body = {
        username: 'Contact Form',
        avatar_url: 'https://abysmal.eu.org/avatar.png',
        embeds: [embed]
    };

    try {
        await fetch(CONTACT_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    } catch {
        return new Response(JSON.stringify({ success: false }), { status: 502 });
    }

    return new Response(JSON.stringify({ success: true }));
};
