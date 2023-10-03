<script setup lang="ts">
import type { CryptocityData } from 'types'
import type { PropType } from 'vue'
import Button from '@/components/atoms/Button.vue'
import CrossIcon from '@/components/icons/icon-cross.vue'
import CryptocityIcon from '@/components/icons/icon-cryptocity.vue'

defineProps({
  cryptocity: {
    type: Object as PropType<CryptocityData>,
    required: true,
  },
})

defineEmits({ close: () => true })
</script>

<template>
  <div
    class="p-6 transition-all duration-300 bg-white shadow cursor-default rounded-t-md desktop:rounded-md border border-[#e9e9ed] desktop:max-w-xs"
    @pointerdown.capture.stop.prevent
    @dblclick.capture.stop.prevent
  >
    <div class="grid items-center grid-cols-[auto_1fr_auto] grid-rows-2 grid-flow-dense gap-x-2">
      <CryptocityIcon style="width: 31px; height: 27px" class="row-span-full" />
      <h3 class="text-space leading-[1]" :class="cryptocity.locationsCount <= 1 ? 'row-span-full' : ''">{{ cryptocity.name }}</h3>
      <span v-if="cryptocity.locationsCount > 1" class="text-sm leading-[1] text-space/70">{{ $tc('{count} locations', cryptocity.locationsCount) }}</span>
      <button type="button" class="relative w-6 h-6 col-start-3 p-2 ml-auto transition rounded-full text-space bg-space/10 row-span-full -top-1" :aria-label="$t('Close')" :class="cryptocity.locationsCount > 1 ? 'self-start' : 'row-span-full'" @click="$emit('close')">
        <CrossIcon />
      </button>
    </div>

    <p v-for="(p, i) in cryptocity.description" :key="i" class="text-sm text-space/80 [text-wrap:pretty]" :class="i === 0 ? 'pt-3' : 'pt-2'">{{ p }}</p>
    <Button :href="cryptocity.url" class="mt-2 !p-0 !h-auto [&_span]:!text-sm" bg-color="transparent" size="sm" text-color="sky">
      <template #label>
        {{ cryptocity.url }}
      </template>
    </Button>
  </div>
</template>
