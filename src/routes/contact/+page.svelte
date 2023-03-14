<script lang="ts">
    import type Contact from '$lib/interfaces/Contact';
    import type User from '$lib/interfaces/User';

    const user = {} as User;

    enum SubmitStatus {
        SUBMITTING = 'submitting',
        SUCCESS = 'success',
        FAILED = 'failed',
    }

    let submitState: SubmitStatus;

    const submitForm = async () => {
        submitState = SubmitStatus.SUBMITTING;

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

        res.success
            ? (submitState = SubmitStatus.SUCCESS)
            : (submitState = SubmitStatus.FAILED);
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

        {#if submitState === SubmitStatus.SUBMITTING}
            <div class="alert alert-info">Submitting...</div>
        {:else if submitState === SubmitStatus.SUCCESS}
            <div class="alert alert-success">Submission success</div>
        {:else if submitState === SubmitStatus.FAILED}
            <div class="alert alert-danger">Submission failed</div>
        {/if}
    </div>
    <a href=".." class="mx-1 block font-[Inter] font-bold">◄ back</a>
</div>
