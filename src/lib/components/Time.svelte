<script lang="ts">
    import { fly } from 'svelte/transition';
    export let now: Date;

    const timeZone = 'Etc/GMT+3';
    const isTimeZoneSame = Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;
    let timeZoneToggle = false;

    $: timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: timeZoneToggle ? timeZone : undefined
    });
    $: dateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: 'short',
        timeZone: timeZoneToggle ? timeZone : undefined
    });

    $: date = dateFormatter.format(now);
    $: time = timeFormatter.format(now);
</script>

{#key timeZoneToggle}
    <div in:fly={{ y: 75, duration: 300, delay: 300 }} out:fly={{ y: 75, duration: 300 }}>
        {#if isTimeZoneSame}
            <div class="to-the-side text-ctp-sapphire">
                <span>{date}</span>
                <span>{time}</span>
            </div>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="to-the-side cursor-pointer text-ctp-sapphire hover:underline"
                on:click={() => (timeZoneToggle = !timeZoneToggle)}
                role="button"
                tabindex="0"
            >
                <span>{date}</span>
                <span>{time}</span>
            </div>
        {/if}
    </div>
{/key}
