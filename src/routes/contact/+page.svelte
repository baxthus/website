<script lang="ts">
    import Back from '$lib/components/Back.svelte';
    import type { User, Contact } from '$lib/interfaces/Contact';

    const user = {} as User;

    let submitStatus: 'submitting' | 'success' | 'failed';

    const submitForm = async () => {
        submitStatus = 'submitting';

        const data: Contact = {
            url: window.location.protocol + '//' + window.location.host,
            name: user.name,
            email: user.email,
            message: user.message,
        };

        const res = await (
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
        ).json();

        res.success ? (submitStatus = 'success') : (submitStatus = 'failed');
    };
</script>

<svelte:head>
    <link rel="stylesheet" href="https://tilde.team/css/hacker.css" />
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
        rel="stylesheet"
        href="https://fonts.bunny.net/css?family=inter:400,700&display=swap"
    />
</svelte:head>

<div class="m-5">
    <div class="well">
        <form on:submit|preventDefault={submitForm}>
            <fieldset>
                <legend>Contact Form</legend>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        bind:value={user.name}
                        required
                    />
                </div>
                <div class="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        class="form-control"
                        bind:value={user.email}
                        required
                    />
                    <!-- prettier-ignore -->
                    <span class="help-block mx-1">Please do not send junk mail, frankly, I'll fuck the sender</span>
                </div>
                <div class="form-group">
                    <textarea
                        cols="3"
                        class="form-control"
                        placeholder="Your message"
                        bind:value={user.message}
                        required
                    />
                </div>
                <div class="form-group">
                    <!-- prettier-ignore -->
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </fieldset>
        </form>

        {#if submitStatus === 'submitting'}
            <div class="alert alert-info">Submitting...</div>
        {:else if submitStatus === 'success'}
            <div class="alert alert-success">Submission success</div>
        {:else if submitStatus === 'failed'}
            <div class="alert alert-danger">Submission failed</div>
        {/if}
    </div>
    <Back class="mx-1" />
</div>
