<script lang="ts">
    import '$lib/app.css';

    interface Wallet {
        name: string;
        address: string;
    }

    // prettier-ignore
    const wallets: Array<Wallet> = [
        // cspell: disable-next
        { name: 'Bitcoin', address: 'bc1qspqkgle0u8n6a09rfv62nugn8ghkcvgh7nyj5w' },
        { name: 'Ethereum', address: '0x17c494ad62B80f54766f03726C623381977BB40a' },
        // cspell: disable-next
        { name: 'Monero', address: '475Ug7rLP78c5KDJ8NMrBWR6d95dMaceDK2sJy7cw9pRQu6u7As8eY118gAPRLQUdnBu4pAeUAm5hZyUS6uVwBBnNAXC3Bo' },
    ]

    const copy = (text: string) => navigator.clipboard.writeText(text);
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
        rel="stylesheet"
        href="https://fonts.bunny.net/css?family=inter:400,700&display=swap"
    />
</svelte:head>

<!-- prettier-ignore -->
<section class="p-8 sm:p-12 lg:p-24 lg:py-16 font-jetBrains z-10 flex flex-col sm:flex-row gap-y-10 justify-between">
    <div class="flex flex-col gap-7">
        <div class="min-h-0">
            <span class="text-[#cba6f7]">make a donation with cryptocurrencies</span>
        </div>
        <div class="text-[#cdd6f4]">
            {#each wallets as { name, address }}
                <p>
                    {name}: <code>{address}</code><br>
                    <button on:click={() => copy(address)}>Copy wallet</button>
                </p>
                <br>
            {/each}
        </div>
        <div>
            <a href=".." class="font-[Inter] font-bold">◄ back</a>
        </div>
    </div>
</section>

<style>
    code {
        @apply bg-[#313244] border border-[#45475a] rounded py-px px-1;
        word-break: break-all;
    }

    button {
        @apply bg-[#313244] border border-[#6c7086] rounded hover:bg-[#6c7086] hover:text-[#181825] py-0.5 px-2 mt-1;
    }
</style>
