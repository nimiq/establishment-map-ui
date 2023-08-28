<script setup lang="ts">
import type { PropType } from 'vue'
import ProviderIcon from '../icons/providers/ProviderIcon.vue'
import { type Location } from '@/types'

defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true,
  },
  withGradient: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <template v-if="!location.isAtm">
    <div
      v-if="withGradient"
      class="absolute rounded-b-lg right-0 top-0 bg-[radial-gradient(100%_75.78%_at_100%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)] opacity-20 pointer-events-none w-full h-full"
    />
    <div v-bind="$attrs" class="absolute bottom-0 right-0 z-20 pointer-events-none place-content-center overflow-hidden w-full h-full">
      <div
        class="absolute right-0.5 -bottom-[3px] bg-[url(@/assets/provider-rings-bg.svg)] bg-[59px_59px] bg-no-repeat h-[186px] w-[186px]"
      >
        <div
          class="absolute p-1.5 rounded-full w-9 h-9 right-4 bottom-4 place-content-center bg-white"
        >
          <ProviderIcon :provider="location.provider" class="w-6 h-6" />
        </div>
      </div>
    </div>
  </template>

  <template v-if="location.isAtm">
    <div
      v-if="withGradient"
      class="absolute rounded-lg right-0 top-0 bg-[radial-gradient(100%_75.78%_at_100%_0%,#ffffff_0%,rgba(255,255,255,0)_100%)] opacity-20 pointer-events-none w-full h-full"
    />
    <div v-bind="$attrs" class="absolute bottom-0 right-0 z-20 pointer-events-none place-content-center overflow-hidden w-full h-full">
      <div
        class="absolute -bottom-1.5 -right-1.5 bg-[url(@/assets/atm-provider-rings-bg.svg)] bg-no-repeat h-[118px] w-[118px]"
      />
      <ProviderIcon :provider="location.provider" class="w-8 h-8 absolute bottom-9 right-9" />
    </div>
  </template>
</template>
