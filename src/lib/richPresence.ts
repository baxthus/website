import type { fetchUserData } from 'lanyard-wrapper';

// Get the return type of fetchUserData without the Promise
// For some reason the type is not exported
export type Data = ReturnType<typeof fetchUserData> extends Promise<infer T> ? T : never;

const VsCodeId = '810516608442695700';

export interface VSCodeData {
	lang?: string;
	workspace?: string;
	branch?: string;
	idling?: boolean;
}

export interface Activity {
	name: string;
	start?: Date;
}

export function getCodeData(data?: Data): VSCodeData | undefined {
	const codeActivity = data?.activities.find((a) => a.application_id === VsCodeId);
	if (!codeActivity) return undefined;

	if (codeActivity.details === 'Idling') return { idling: true };

	const workspace = codeActivity.details?.substring(3).split(' - ')[0];
	const branch = codeActivity.details
		?.substring(3)
		.replaceAll(/\u200b/g, '')
		.trim()
		.split(' - ')[1];
	const lang = codeActivity.assets?.large_text?.split(' ')[2].toLocaleLowerCase();

	return { workspace, branch, lang };
}

export function getOtherActivities(data?: Data): Array<Activity> | undefined {
	const otherActivities = data?.activities.filter(
		(a) => a.application_id !== VsCodeId && a.type === 0
	);
	if (!otherActivities) return undefined;

	return otherActivities.map((activity) => ({
		name: activity.name ?? '',
		start: activity.timestamps ? new Date(activity.timestamps.start ?? 0) : undefined
	}));
}
