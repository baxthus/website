<script lang="ts">
    export let now: Date;

    const timeZone = 'Etc/GMT+3';
    const isTimeZoneSame =
        Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;
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

    $: date = dateFormatter.format(now);
    $: time = timeFormatter.format(now);
</script>

{#if !isTimeZoneSame}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="text-[#74c7ec] flex flex-col items-start sm:items-end hover:underline cursor-pointer"
        on:click={() => {
            timeZoneToggle = !timeZoneToggle;
        }}
    >
        <span>{date}</span>
        <span>{time}</span>
    </div>
{:else}
    <div class="text-[#74c7ec] flex flex-col items-start sm:items-end">
        <span>{date}</span>
        <span>{time}</span>
    </div>
{/if}
