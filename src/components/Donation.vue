<script setup lang="ts">
import { IconCircleLetterZ, IconCurrencyBitcoin, IconCurrencyEthereum, IconCurrencyMonero, IconCurrencySolana, IconCurrencyXrp, type Icon } from '@tabler/icons-vue';

const model = defineModel<boolean>('visible');

const toast = useToast();

const visible = ref(model);

const currencies = ref<Array<{ name: string; content: string; icon: Icon }>>([
  { name: 'Bitcoin', content: '1D9JjFVx9Z4R3mW7G3oW3RQzZwcuMznFRy', icon: IconCurrencyBitcoin },
  { name: 'Ethereum', content: '0x8ebC86F50C95CDb40Fc62A45EF2debe59ccb1eCd', icon: IconCurrencyEthereum },
  { name: 'Solana', content: 'HcE83vxEMwyyXu2UAA8pZrfGkby8zhRtJxnBNoStgKBW', icon: IconCurrencySolana },
  { name: 'Ripple', content: 'rpZxgFKrWZKBUnJUt85y3Rq4andQKUS1ZK', icon: IconCurrencyXrp },
  { name: 'Monero', content: '436s6QAja169yqcsiF9Hoia2Q4sX3jasTMfgMREfJRYE1dD3Gd8tXT9226h2Vfu6S7CQQVe1P2fn2Eiv9sBBmxcCA8XVTHK', icon: IconCurrencyMonero },
  { name: 'ZCash', content: 't1eh6QYLAm6jPbsTJFXR2QTw61TUA9DLzbi', icon: IconCircleLetterZ },
]);
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Donation methods"
    class="min-w-80"
    pt:mask:class="backdrop-blur-sm"
  >
    <div class="flex flex-col gap-4 mt-1">
      <Button
        v-for="currency in currencies"
        :key="currency.name"
        :label="currency.name"
        severity="contrast"
        variant="outlined"
        class="w-full"
        @click="copyToClipboard(toast, currency.content, 'Thank you for your donation!')"
      >
        <template #icon>
          <component :is="currency.icon" class="w-8 h-auto" />
        </template>
      </Button>
    </div>
  </Dialog>
</template>
