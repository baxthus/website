<script lang="ts">
    import { page } from '$app/stores';
</script>

<svelte:head>
    <!--suppress JSUnresolvedLibraryURL -->
    <title>{$page.status}</title>
</svelte:head>

<section class="text-center">
    <h1 class="mt-10">{$page.status}: {$page.error?.message}</h1>
</section>

<style lang="postcss">
    h1 {
        @apply text-4xl font-bold;
    }
</style>
