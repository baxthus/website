<script lang="ts">
    import { page } from '$app/stores';
</script>

<head>
    <link rel="stylesheet" href="https://tilde.team/css/hacker.css" />
    <title>{$page.status}</title>
</head>

<section class="text-center">
    <h1>{$page.status}: {$page.error?.message}</h1>
</section>
