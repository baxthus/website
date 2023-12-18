<script lang="ts">
    export let type: 'success' | 'error' | 'warning' | 'info' = 'success';
    let classes = '';
    // noinspection ReservedWordAsName
    export { classes as class };

    let nodeRef: HTMLDivElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="alert hover:cursor-pointer alert-{type} {classes}"
    bind:this={nodeRef}
    on:click={() => nodeRef.remove()}
    role="button"
    tabindex="0"
>
    <slot />
</div>

<!--suppress CssUnusedSymbol -->
<style lang="postcss">
    .alert {
        @apply my-2 rounded border border-ctp-overlay0 bg-ctp-base p-4;
    }

    .alert-success {
        @apply border-ctp-green border-opacity-50 text-ctp-green;
    }

    .alert-error {
        @apply border-ctp-red border-opacity-50 text-ctp-red;
    }

    .alert-warning {
        @apply border-ctp-yellow border-opacity-50 text-ctp-yellow;
    }

    .alert-info {
        @apply border-ctp-blue border-opacity-50 text-ctp-blue;
    }
</style>
