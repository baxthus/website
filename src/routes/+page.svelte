<script lang="ts">
	import { connectWebSocket } from 'lanyard-wrapper';
	import { type Data, getCodeData, getOtherActivities } from '$lib/richPresence';
	import Workspace from '$lib/components/richPresence/Workspace.svelte';
	import Branch from '$lib/components/richPresence/Branch.svelte';
	import Language from '$lib/components/richPresence/Language.svelte';
	import Link from '$lib/components/Link.svelte';
	import Projects from '$lib/data/projects.json';
	import Links from '$lib/data/links.json';
	import type { Project } from '$lib/interfaces/Project';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import Time from '$lib/components/Time.svelte';
	import Spotify from '$lib/components/richPresence/Spotify.svelte';
	import Code from '$lib/components/richPresence/Code.svelte';
	import Other from '$lib/components/richPresence/Other.svelte';
	import Commit from '$lib/components/Commit.svelte';
	import { onMount } from 'svelte';

	const projects = Projects as Array<Project>;
	const links = Links as Array<Project>;

	let now = new Date();
	setInterval(() => {
		now = new Date();
	}, 1000);

	let data: Data;
	onMount(() => {
		connectWebSocket('505432621086670872', (d) => (data = d));
	});
	$: codeData = getCodeData(data);
	$: otherActivities = getOtherActivities(data);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.bunny.net" />
	<link rel="stylesheet" href="https://fonts.bunny.net/css?family=noto-sans-jp:600&display=swap" />
</svelte:head>

<section
	class="p-8 sm:p-12 lg:p-24 lg:py-16 font-jetBrains z-10 flex flex-col sm:flex-row gap-y-10 justify-between"
>
	<div class="flex flex-col gap-7">
		<div class="min-h-0" id="names">
			<span class="text-ctp-mauve">baxthus</span>
			<Workspace workspace={codeData?.workspace} />
			<Branch name={codeData?.branch} />
			<Language lang={codeData?.lang} />
		</div>
		<div>
			<h1 class="text-ctp-blue">fun facts about me</h1>
			<ul class="list-disc list-inside">
				<li>i'm brazilian</li>
				<li>i'm learning C#</li>
				<li>i'm not fully fluent in english</li>
				<li>
					Here's some <Link href="/music" newTab={false}>cool music</Link>
				</li>
			</ul>
		</div>
		<div>
			<h1 class="text-ctp-blue">projects</h1>
			<ul class="list-disc list-inside text-ctp-overlay1">
				{#each projects as project}
					<ProjectItem
						href={project.url}
						name={project.name}
						description={project.description}
						newTab={project.newTab}
					/>
				{/each}
			</ul>
		</div>
		<div>
			<h1 class="text-ctp-blue">links</h1>
			<ul class="list-disc list-inside text-ctp-overlay1">
				{#each links as link}
					<ProjectItem
						href={link.url}
						name={link.name}
						description={link.description}
						newTab={link.newTab}
					/>
				{/each}
			</ul>
		</div>
		<div>
			<Link href="/donate" newTab={false}>donation</Link>
		</div>
	</div>
	<div class="flex flex-col items-start sm:items-end gap-5 sm:gap-7 sm:text-right">
		<Time {now} />
		<Spotify {data} />
		<Code data={codeData} />
		<Other data={otherActivities} {now} />
		<Commit />
	</div>
</section>
