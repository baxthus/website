<script lang="ts">
	import type { Activity } from '$lib/richPresence';
	import { DateTime } from 'luxon';

	export let data: Activity[] | undefined;
	export let now: Date;
</script>

{#if data}
	{#each data as activity}
		<div class="flex flex-col items-start sm:items-end">
			<span>
				playing <span class="text-ctp-pink">{activity.name}</span>
			</span>
			{#if activity.start}
				<span>
					for <span class="text-ctp-sky">
						{DateTime.fromJSDate(activity.start)
							.toRelative({ base: DateTime.fromJSDate(now), locale: 'en-US' })
							?.replace(' ago', '')}
					</span>
				</span>
			{/if}
		</div>
	{/each}
{/if}
