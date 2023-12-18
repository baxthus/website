<script lang="ts">
    import Link from '$lib/components/Link.svelte';

    export let href = '..';
    let classes = '';
    export { classes as class };
</script>

<Link {href} class="block font-bold {classes}" newTab={false}>◄ back</Link>
