<script lang="ts">
    import { DateTime } from 'luxon';
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import Branch from '$lib/components/Branch.svelte';
    import Language from '$lib/components/Language.svelte';
    import Workspace from '$lib/components/Workspace.svelte';
    import { getCodeData, getOtherActivities } from '$lib/richPresence';
    import { useLanyard } from 'sk-lanyard';
    import getCommit from '$lib/getCommit';

    const commitHash = getCommit();

    const timeZone = 'Etc/GMT+3';
    // prettier-ignore
    const isTimeZoneSame = Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;
    let timeZoneToggle = false;

    $: timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: timeZoneToggle ? timeZone : undefined,
    });
    $: dateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: 'short',
        timeZone: timeZoneToggle ? timeZone : undefined,
    });

    let now = new Date();
    setInterval(() => {
        now = new Date();
    }, 100);

    $: date = dateFormatter.format(now);
    $: time = timeFormatter.format(now);

    const data = useLanyard({ method: 'ws', id: '505432621086670872' });
    $: codeData = getCodeData($data);
    $: otherActivities = getOtherActivities($data);
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
        rel="stylesheet"
        href="https://fonts.bunny.net/css?family=inter:600&display=swap"
    />
</svelte:head>

<!-- prettier-ignore -->
<section class="p-8 sm:p-12 lg:p-24 lg:py-16 font-jetBrains z-10 flex flex-col sm:flex-row gap-y-10 justify-between">
    <div class="flex flex-col gap-7">
        <div class="min-h-[3em] lg:min-h-0" id="names">
            <span class="text-[#cba6f7]">
                <span id="name1">abysmal</span>
                <span class="font-japaneseFonts font-semibold" id="name2">アビスマル</span>
            </span>
            <Workspace workspace={codeData?.workspace} />
            <Branch name={codeData?.branch} />
            <Language lang={codeData?.lang} />
        </div>
        <div class="text-[#cdd6f4]">
            <h1 class="text-[#89b4fa]">fun facts about me</h1>
            <ul class="list-disc list-inside">
                <li>i'm brazilian</li>
                <li>i'm learning javascript/typescript</li>
                <li>i'm not fully fluent in english</li>
                <li>i love <a href="https://kutt.it/CoolMusic" target="_blank" rel="noreferrer" class="text-[#b4befe] hover:underline">this music</a></li>
            </ul>
        </div>
        <div>
            <h1 class="text-[#89b4fa]">projects</h1>
            <ul class="list-disc list-inside text-[#7f849c]">
                <ProjectItem
                href="https://github.com/Abysm0xC/website"
                name="website"
                description="this website"
                />
                <ProjectItem
                href="https://github.com/Abysm0xC/AdramelechBot"
                name="adramelech bot"
                description="my discord bot"
                />
                <ProjectItem
                href="https://github.com/Abysm0xC/errorpages"
                name="error pages"
                description="error pages template"
                />
                <ProjectItem
                href="https://github.com/Abysm0xC/digital-clock"
                name="digital clock"
                description="a digital clock example in svelte"
                />
                <ProjectItem
                href="https://github.com/Abysm0xC/tests"
                name="random scripts"
                description="my random scripts"
                />
            </ul>
        </div>
        <div>
            <h1 class="text-[#89b4fa]">links</h1>
            <ul class="list-disc list-inside text-[#7f849c]">
                <ProjectItem
                href="https://ayo.so/abysmal26"
                name="ayo"
                description="find all my socials here"
                />
                <ProjectItem
                href="https://t.me/Abysm0xC"
                name="telegram"
                description="best way to contact me"
                />
                <ProjectItem
                href="mailto:abysmal@ttm.sh"
                name="abysmal@ttm.sh"
                description="contact email"
                />
                <ProjectItem
                href="mailto:baxthus@proton.me"
                name="baxthus@proton.me"
                description="main email"
                />
                <ProjectItem
                href="/abysmal.asc"
                name="pubkey"
                description="my gpg public key"
                />
                <ProjectItem
                href="https://status.abysmal.eu.org"
                name="status page"
                />
                <ProjectItem
                href="https://github.com/Abysm0xC"
                name="github"
                />
                <ProjectItem
                href="https://twitter.com/Abysm0xC"
                name="twitter"
                />
                <ProjectItem
                href="https://instagram.com/Abysm0xC"
                name="instagram"
                />
                <ProjectItem
                href="/contact"
                name="contact form"
                newTab={false}
                />
                <ProjectItem
                href="/blog"
                name="blog (not very active)"
                newTab={false}
                />
            </ul>
        </div>
        <div>
            <h1><a href="/donate" class="text-[#b4befe] hover:underline">donation</a></h1>
        </div>
    </div>
    <div class="text-[#cdd6f4] flex flex-col items-start sm:items-end gap-3 sm:gap-7 sm:text-right">
        {#if !isTimeZoneSame}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="text-[#74c7ec] flex flex-col items-start sm:items-end hover:underline cursor-pointer" on:click={() => {timeZoneToggle = !timeZoneToggle;}}>
                <span>{date}</span>
                <span>{time}</span>
            </div>
        {:else}
            <div class="text-[#74c7ec] flex flex-col items-start sm:items-end">
                <span>{date}</span>
                <span>{time}</span>
            </div>
        {/if}
        {#if $data?.spotify}
            <div class="flex flex-col items-start sm:items-end">
                <h1 class="font-bold">listening to</h1>
                <span class="text-[#f5c2e7]"><a href="https://open.spotify.com/track/{$data.spotify?.track_id}" target="_blank" rel="noreferrer" class="hover:underline">{$data.spotify.song}</a></span>
                <span class="text-[#89dceb]">{$data.spotify.artist}</span>
                <span class="text-[#94e2d5]">{$data.spotify.album}</span>
                <img src="{$data.spotify.album_art_url.replace('spotify:', 'https://i.scdn.co/image/')}" alt="Album cover" style="width: 7rem;" class="mt-1">
            </div>
        {/if}
        {#if codeData?.idling}
            <div class="flex flex-col items-start sm:items-end">
                <span class="font-bold">vs code</span>
                <span class="text-[#f5c2e7]">currently idling</span>
            </div>
        {/if}
        {#if codeData && !codeData.idling}
            <div class="flex flex-col items-start sm:items-end">
                <span class="font-bold">vs code</span>
                <span class="text-[#f5c2e7]">{codeData.workspace?.replace(/[\u200B-\u200D\uFEFF]/g, '')}{codeData.branch ? `/${codeData.branch}` : ''}</span>
                <span>writing <span class="text-[#89dceb]">{codeData.lang}</span></span>
            </div>
        {/if}
        {#if otherActivities}
            {#each otherActivities as activity}
                <div class="flex flex-col items-start sm:items-end">
                    <span>playing <span class="text-[#f5c2e7]">{activity.name}</span></span>
                    {#if activity.start}
                        <span>for <span class="text-[#89dceb]">{DateTime.fromJSDate(activity.start).toRelative({ base: DateTime.fromJSDate(now), locale: 'en-US' })?.replace(' ago', '')}</span></span>
                    {/if}
                </div>
            {/each}
        {/if}
        {#await commitHash}
            <div>
                Loading...
            </div>
        {:then commitHash}
            <div>
                <a href="https://github.com/abysmal26/website/commit/{commitHash}" target="_blank" rel="noreferrer" class="text-[#b4befe] hover:underline">{commitHash}</a>
            </div>
        {/await}
    </div>
</section>

<style>
    div#names span#name1 {
        display: inline;
    }
    div#names:hover span#name1 {
        display: none;
    }

    div#names span#name2 {
        display: none;
    }
    div#names:hover span#name2 {
        display: inline;
    }
</style>
