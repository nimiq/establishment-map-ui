<script setup lang="ts">
import type { PropType } from 'vue'
import Popover from '@/components/atoms/Popover.vue'
import CardBg from '@/components/elements/CardBg.vue'
import InfoIcon from '@/components/icons/icon-info.vue'
import { type Location, Provider } from '@/types'

defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true,
  },
  isAtm: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <footer class="relative flex items-center h-16">
    <CardBg v-if="!location.isAtm" :location="location" />

    <div class="z-20 flex items-center pt-1.5 pl-6 pr-4 text-xs gap-x-1.5">
      <i18n-t
        v-if="[Provider.Bluecode, Provider.CryptopaymentLink, Provider.GoCrypto].includes(location.provider)"
        keypath="Powered by {provider}" tag="p" :class="{
          'text-white/60 [&>b]:text-white': location.isDark,
          'text-space/60 [&>b]:text-space': location.isLight,
        }"
      >
        <template #provider>
          <b>{{ location.provider }}</b>
        </template>
      </i18n-t><i18n-t
        v-if="[Provider.Edenia, Provider.Kurant].includes(location.provider)"
        keypath="Register with {provider}" tag="p" :class="{
          'text-white/60 [&>b]:text-white': location.isDark,
          'text-space/60 [&>b]:text-space': location.isLight,
        }"
      >
        <template #provider>
          <b>{{ location.provider }}</b>
        </template>
      </i18n-t>

      <Popover preferred-position="top">
        <template #trigger>
          <InfoIcon
            :class="{
              'text-white/50': location.isDark,
              'text-space/50': location.isLight,
            }"
          />
        </template>
        <template #title>
          {{ location.provider }}
        </template>
        <template #description>
          {{ location.providerTooltip }}
        </template>
      </Popover>
    </div>
  </footer>
</template>
