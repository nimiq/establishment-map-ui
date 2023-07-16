<script lang="ts">
export const MOBILE_LIST_PROVIDER_KEY = Symbol();

export type MobileListProvider = {
  progress: Ref<number>,
  updateProgress: (progress: number) => void
}
</script>

<script setup lang="ts">
import MobileEstablishmentCard, { INITIAL_GAP_TO_SCREEN } from "@/components/elements/MobileEstablishmentCard.vue";
import type { NewEstablishment } from '@/database';
import { ref, type PropType, type Ref } from "vue";

defineProps({
  establishments: {
    type: Array as PropType<NewEstablishment[]>,
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
      <MobileEstablishmentCard :e="establishment" :progress="progress" @update:progress="progress = $event" />
    </li>
  </ul>
</template>
