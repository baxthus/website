<script lang="ts">
    import type Contact from '$lib/types/contact';

    let inputName: string;
    let inputEmail: string;
    let inputMessage: string;
    let submitStatus: string;

    const submitForm = async () => {
        submitStatus = 'submitting';

        const data: Contact = {
            originURL: window.location.protocol + '//' + window.location.host,
            inputName,
            inputEmail,
            inputMessage,
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
</svelte:head>

<!-- prettier-ignore -->
<section class="p-8 sm:p-12 lg:p-24 lg:py-16 font-jetBrains z-10 flex flex-col sm:flex-row gap-y-10 justify-between">
    <div class="flex flex-col gap-7">
        <div class="well">
            <form on:submit|preventDefault={submitForm}>
                <fieldset>
                    <legend>Contact Form</legend>
                    <div class="form-group">
                        <input type="text" placeholder="Name" class="form-control" bind:value={inputName} required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email" class="form-control" bind:value={inputEmail} required>
                        <span class="help-block">Please do not send junk mail, frankly, I'll fuck the sender</span>
                    </div>
                    <div class="form-group">
                        <textarea cols="3" class="form-control" placeholder="Your message" bind:value={inputMessage} required></textarea>
                    </div>
                    <div class="form-group">
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
        <a href=".." class="text-[#b4befe] hover:underline">← back</a>
    </div>
</section>
