<script lang="ts">
	import type { Contact, User } from '$lib/interfaces/Contact';
	import Back from '$lib/components/Back.svelte';
	import { blur } from 'svelte/transition';

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

<svelte:head>
	<!--suppress JSUnresolvedLibraryURL -->
	<link rel="stylesheet" href="https://tilde.team/css/hacker.css" />
</svelte:head>

<div class="m-5">
	<div class="wall">
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
					{#if !submitStatus || submitStatus === 'failed'}
						<button type="submit" class="btn btn-primary">Submit</button>
					{/if}
					{#if submitStatus === 'submitting'}
						<button type="submit" class="btn btn-default" disabled>Submitting...</button>
					{/if}
					{#if submitStatus === 'success'}
						<button type="submit" class="btn btn-default" disabled>Submitted</button>
					{/if}
				</div>
			</fieldset>
		</form>

		{#key submitStatus}
			<div transition:blur={{ duration: 300 }}>
				{#if submitStatus === 'success'}
					<div class="alert alert-success">Submission success</div>
				{:else if submitStatus === 'failed'}
					<div class="alert alert-danger">Submission failed</div>
				{/if}
			</div>
		{/key}
	</div>
	<Back class="mx-1" />
</div>
