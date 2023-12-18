<script lang="ts">
    import Wallets from '$lib/data/wallets.json';
    import Back from '$lib/components/Back.svelte';

    interface Wallet {
        name: string;
        address: string;
    }

    const wallets = Wallets as Wallet[];
</script>

<section class="content-section">
    <div class="main-content w-full break-all">
        <Back />
        <div>
            <p>Sponsor me on GitHub</p>
            <iframe
                src="https://github.com/sponsors/baxthus/button"
                title="Sponsor baxthus"
                height="32"
                width="114"
                style="border: 0; border-radius: 6px;"
            />
        </div>
        {#each wallets as { name, address }}
            <div>
                <p>{name}: <code>{address}</code></p>
                <button on:click={() => navigator.clipboard.writeText(address)}>Copy wallet</button>
            </div>
        {/each}
    </div>
</section>
