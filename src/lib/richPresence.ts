// 810516608442695700 == https://marketplace.visualstudio.com/items?itemName=LeonardSSH.vscord

import type { LanyardData } from 'sk-lanyard';

export interface VSCodeData {
    lang?: string,
    workspace?: string,
    branch?: string,
    idling?: boolean
}

export interface Activity {
    name: string,
    start?: Date
}

export const getCodeData = (data?: LanyardData): VSCodeData | undefined => {
    const codeActivity = data?.activities.find(a => a.application_id === '810516608442695700');

    if (!codeActivity) return undefined;

    if (codeActivity.details === 'Idling') {
        return {
            idling: true,
        } as VSCodeData;
    }

    const workspace = codeActivity.details.substring(3).split(' - ')[0];
    const branch = codeActivity.details.substring(3).replaceAll(/\u200b/g, '').trim().split(' - ')[1];
    const lang = codeActivity.assets.large_text?.split(' ')[2].toLocaleLowerCase();

    return {
        lang,
        workspace,
        branch,
    } as VSCodeData;
};

export const getOtherActivities = (data?: LanyardData): Activity[] | undefined => {
    const otherActivities = data?.activities.filter(a => a.application_id !== '810516608442695700' && a.type === 0);

    if (!otherActivities) return undefined;

    return otherActivities?.map(activity => ({
        name: activity.name,
        start: activity.timestamps ? new Date(activity.timestamps.start) : undefined,
    })) as Activity[];
};