<script setup lang="ts">
import type { Location } from '@/database';
import { ref, type PropType } from "vue";

const INITIAL_GAP_TO_SCREEN = 20/*px*/ // The gap between the cards to the screen

defineProps({
  establishments: {
    type: Array as PropType<Location[]>,
    default: () => [],
  },
})

// We have only one progress across all elements. If any of the element moves, all of them move.
// Value is between 0 and 1
const progress = ref(0)
</script>

<template>
  <ul
    class="flex items-end w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-x-3 scroll-mx-[var(--spacing)]"
    :style="`--spacing: ${(1 - progress) * INITIAL_GAP_TO_SCREEN}px`">
    <li v-for="(establishment, i) in establishments" :key="i"
      class="relative shrink-0 snap-center first:pl-[var(--spacing)] last:pr-[var(--spacing)]">
      <SheetModal :initial-height="162" :max-height="371" :initial-border-radius="8"
        :initial-gap-to-screen="INITIAL_GAP_TO_SCREEN" class="relative w-full px-6 pb-5 bg-white rounded-t-lg"
        :progress="progress" @update:progress="progress = $event">
        <LocationCard :establishment="establishment" :progress="progress" />
      </SheetModal>
    </li>
  </ul>
</template>
