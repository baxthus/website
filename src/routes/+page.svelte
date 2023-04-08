<script lang="ts">
    import ProjectItem from '$lib/components/ProjectItem.svelte';
    import Branch from '$lib/components/Branch.svelte';
    import Language from '$lib/components/Language.svelte';
    import Workspace from '$lib/components/Workspace.svelte';
    import { getCodeData, getOtherActivities } from '$lib/richPresence';
    import { useLanyard } from 'sk-lanyard';
    import CodeIdling from '$lib/components/richPresence/CodeIdling.svelte';
    import Time from '$lib/components/Time.svelte';
    import Spotify from '$lib/components/richPresence/Spotify.svelte';
    import Code from '$lib/components/richPresence/Code.svelte';
    import Other from '$lib/components/richPresence/Other.svelte';
    import Commit from '$lib/components/Commit.svelte';

    let now = new Date();
    setInterval(() => {
        now = new Date();
    }, 100);

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
        <div class="min-h-0" id="names">
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
    <div class="text-[#cdd6f4] flex flex-col items-start sm:items-end gap-5 sm:gap-7 sm:text-right">
        <Time now={now} />
        <!-- Discord Rich Presence -->
        <Spotify data={$data} />
        <Code data={codeData} />
        <CodeIdling data={codeData} />
        <Other data={otherActivities} now={now} />
        <!-- /// -->
        <Commit />
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
