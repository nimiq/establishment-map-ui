<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { Currency } from 'types'
import CryptoIcon from '@/components/icons/cryptos/CryptoIcon.vue'
import { getCurrencyIcon } from '@/composables/useIcon';

const props = defineProps({
  cryptos: {
    type: Array as PropType<Currency[]>,
    default: () => [],
  },
  label: {
    type: String,
  },
  // max number of cryptos to display. If more, display a "+n" at the end
  max: {
    type: Number,
    default: 3,
  },
})

const cryptosToDisplay = computed(() => {
  const { cryptos, max } = props
  if (cryptos.length <= max)
    return cryptos

  else
    return cryptos.slice(0, max)
})

const n = computed(() => {
  return props.cryptos.length - cryptosToDisplay.value.length
})
</script>

<template>
  <div v-if="cryptosToDisplay.length > 0" flex="~ items-center gap-x-8">
    <ul flex="~ items-center gap-x-8" p-4 bg-neutral-0 rounded-full w-max ring="1.5 ring-neutral/10">
      <li v-for="c in cryptosToDisplay " :key="c">
        <div text-24 :class="getCurrencyIcon(c)" />
      </li>
      <li v-if="n > 0" pr-4 text="14 neutral-700">
        +{{ n }}
      </li>
    </ul>
  </div>
</template>
