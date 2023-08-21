<script lang="ts">
	export let href: string;
	export let newTab = true;
	let classes = '';
	export { classes as class };
</script>

<a
	{href}
	target={newTab ? '_blank' : undefined}
	rel="noreferrer"
	class="text-ctp-lavender underline hover:text-ctp-blue transition-colors duration-200 {classes}"
	><slot /></a
>
