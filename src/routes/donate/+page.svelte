<script lang="ts">
	import Wallets from '$lib/data/wallets.json';
	import Back from '$lib/components/Back.svelte';

	interface Wallet {
		name: string;
		address: string;
	}

	const wallets = Wallets as Array<Wallet>;
</script>

<section
	class="p-8 sm:p-12 lg:p-24 lg:py-16 z-10 flex flex-col sm:flex-row gap-y-10 justify-between"
>
	<div class="flex flex-col gap-7">
		<div class="min-h-0">
			<span class="text-ctp-mauve">make a donation with cryptocurrencies</span>
		</div>
		<div>
			{#each wallets as { name, address }}
				<p>
					{name}:
					<code
						class="bg-ctp-surface0 border border-ctp-surface1 rounded py-px px-1"
						style="word-break: break-all;">{address}</code
					>
					<br />
					<button
						class="bg-ctp-surface0 border border-ctp-overlay0 rounded hover:bg-ctp-overlay0 hover:text-ctp-mantle py-0.5 px-2 mt-1"
						on:click={() => navigator.clipboard.writeText(address)}>Copy wallet</button
					>
				</p>
				<br />
			{/each}
		</div>
		<div>
			<Back />
		</div>
	</div>
</section>
