<script lang="ts">
    import { onMount } from 'svelte';
    import '$lib/app.css';

    // prettier-ignore
    onMount(() => {
        onblur = () => {
            document.body.className = 'bg-[#1e1e2e] motion-safe:transition-colors motion-safe:duration-300';
        };

        onfocus = () => {
            document.body.className = 'bg-[#11111b] motion-safe:transition-colors motion-safe:duration-300';
        };
    });
</script>

<svelte:head>
    <title>アビスマル</title>

    <meta name="title" content="Abysmal" />
    <meta
        name="description"
        content="Quem não tem colírios usa óculos escuros"
    />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://abysmal.eu.org" />
    <meta property="og:title" content="Abysmal" />
    <meta
        property="og:description"
        content="Quem não tem colírios usa óculos escuros"
    />
    <meta property="og:image" content="https://abysmal.eu.org/avatar.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://abysmal.eu.org" />
    <meta property="twitter:title" content="Abysmal" />
    <meta
        property="twitter:description"
        content="Quem não tem colírios usa óculos escuros"
    />
    <meta
        property="twitter:image"
        content="https://abysmal.eu.org/avatar.png"
    />

    <link rel="me" href="https://mastodon.social/@abysmal26" />

    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
        rel="stylesheet"
        href="https://fonts.bunny.net/css?family=jetbrains-mono:400,700&display=swap"
    />

    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
</svelte:head>

<main class="text-[#cdd6f4]">
    <div class="mx-5 my-4">
        <h1>We are <b>Under Maintenance</b></h1>
        <p>We will be back on Wednesday, April 12th, 2023</p>
    </div>
    <!-- <slot /> -->
</main>
