<script lang="ts">
    import type { User } from '$lib/interfaces/Contact';
    import type Contact from '$lib/interfaces/Contact';
    import { blur, fly } from 'svelte/transition';
    import Back from '$lib/components/Back.svelte';
    import Alert from '$lib/components/Alert.svelte';

    const user = {} as User;

    let submitStatus: 'submitting' | 'success' | 'failed';

    async function submitForm() {
        submitStatus = 'submitting';

        const data: Contact = {
            url: window.location.protocol + '//' + window.location.host,
            name: user.name,
            email: user.email,
            message: user.message
        };

        const res = await (
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
        ).json();

        res.success ? (submitStatus = 'success') : (submitStatus = 'failed');
    }
</script>

<section class="content-section">
    <div class="main-content">
        <Back />
        <form on:submit|preventDefault={submitForm}>
            <fieldset>
                <legend>Contact Form</legend>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        bind:value={user.name}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        class="form-control"
                        bind:value={user.email}
                        required
                    />
                    <span class="help-block"
                        >Please don't send junk mail, frankly, I'll fuck the sender</span
                    >
                </div>
                <div>
                    <textarea
                        cols="3"
                        class="form-control"
                        placeholder="Your message"
                        bind:value={user.message}
                        required
                    />
                </div>
                {#key submitStatus}
                    <div
                        in:fly={{ x: -100, duration: 300, delay: 300 }}
                        out:fly={{ x: 100, duration: 300 }}
                    >
                        {#if !submitStatus || submitStatus === 'failed'}
                            <button type="submit" class="btn-bigger">Submit</button>
                        {:else if submitStatus === 'submitting'}
                            <button type="submit" class="btn-bigger" disabled>
                                Submitting...
                            </button>
                        {:else if submitStatus === 'success'}
                            <button type="submit" class="btn-bigger" disabled>Submitted</button>
                        {/if}
                    </div>
                {/key}
            </fieldset>
        </form>
    </div>

    {#key submitStatus}
        <div in:blur={{ duration: 300, delay: 600 }}>
            {#if submitStatus === 'success'}
                <Alert type="success">Submission successful</Alert>
            {:else if submitStatus === 'failed'}
                <Alert type="error">Submission failed</Alert>
            {/if}
        </div>
    {/key}
</section>
