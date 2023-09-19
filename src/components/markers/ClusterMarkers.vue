<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Cluster, Point } from 'types'
import { CustomMarker } from 'vue3-google-map'
import type { PropType } from 'vue'
import { useMap } from '@/stores/map'

defineProps({
  clusters: {
    type: Object as PropType<Cluster[]>,
    required: true,
  },
})

const { setPosition } = useMap()
const { zoom } = storeToRefs(useMap())

// Since the Desktop requires a Popover, we need to create a reusable template where the trigger is the same component
// as in the mobile version, but without the Popover

function onClusterClick(center: Point, proposedZoom: number) {
  // To make it more fluid if zoom is lower than 13, the minimum zoom change must be 3
  const newZoom = proposedZoom < 13 ? Math.max(proposedZoom, zoom.value + 3) : proposedZoom
  setPosition({ center, zoom: newZoom })
}
</script>

<template>
  <CustomMarker
    v-for="({ lat, lng, count, expansionZoom, id }) in clusters" :key="id"
    :options="{ position: { lat, lng }, anchorPoint: 'CENTER' }"
    data-custom-marker
  >
    <div class="grid text-sm font-bold text-white transition-colors rounded-full shadow cursor-pointer aspect-square place-content-center bg-space hover:bg-[#35395A] focus:bg-[#35395A] ring-white/20 ring-2 ring-offset-1 ring-offset-white/40 max-desktop:clickable" :style="`width: clamp(24px, ${0.24 * count + 24}px, 48px); font-size: clamp(14px, ${0.14 * count + 4}px, 18px)`" @click="onClusterClick({ lat, lng }, expansionZoom)">
      {{ count < 100 ? count : '99+' }}
    </div>
  </CustomMarker>
</template>
