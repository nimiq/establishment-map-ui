<script setup lang="ts">
import { Banner, Provider } from 'types'
import NimiqIcon from './nimiq.vue'
import BluecodeIcon from './bluecode.vue'
import CryptopaymentLinkIcon from './cryptopayment-link.vue'
import DefaultAtmIcon from './default-atm.vue'
import EdeniaIcon from './edenia.vue'
import NakaIcon from './naka.vue'
import KurantIcon from './kurant.vue'

defineProps({
  banner: {
    type: String as () => Banner,
    required: true,
  },
})
</script>

<template>
  <div
    class="grid w8 h8 bg-white rounded-full children:w-5 children:h-5 place-content-center"
    :class="{
      '!bg-[#1F2348]': banner === 'Nimiq-Pay',
      '!bg-[#b7ff00]': banner === Provider.NAKA,
    }"
  >
    <NimiqIcon v-if="banner === 'Nimiq-Pay'" />
    <BluecodeIcon v-else-if="banner === Provider.Bluecode" />
    <CryptopaymentLinkIcon v-else-if="banner === Provider.CryptopaymentLink" class="-ml-px" />
    <DefaultAtmIcon v-else-if="banner === Provider.DefaultAtm" />
    <EdeniaIcon v-else-if="banner === Provider.Edenia" class="[&_path]:!fill-[#22afad] [&_path]:!opacity-100" />
    <NakaIcon v-else-if="banner === Provider.NAKA" />
    <KurantIcon v-else-if="banner === Provider.Kurant" class="[&_path]:!fill-[#b22516] [&_path]:!opacity-100" />
  </div>
</template>
