<script lang="ts">
    export let name = '';
</script>

{#if name}
    <span class="inline-block text-ctp-text">
        on <span class="text-ctp-sky">  {name}</span>
    </span>
{/if}
