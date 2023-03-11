<script lang="ts">
    export let href: string;
    export let name: string;
    export let description: string | undefined = undefined;
    export let newTab = true;
</script>

<li>
    <a
        {href}
        target={newTab ? '_blank' : ''}
        rel="noreferrer"
        class="text-[#b4befe] hover:underline">{name}</a
    >
    {#if description}
        <span class="text-[#cdd6f4]">- {description}</span>
    {/if}
</li>
