<script lang="ts">
    export let href: string;
    export let newTab = true;
    let classes = '';
    // noinspection ReservedWordAsName
    export { classes as class };
</script>

<a {href} target={newTab ? '_blank' : undefined} rel="noreferrer" class={classes}><slot /></a>
