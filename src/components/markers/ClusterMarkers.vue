<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Cluster, CryptocityMarker, Point } from 'types'
import { CustomMarker } from 'vue3-google-map'
import type { PropType } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { useMap } from '@/stores/map'
import CryptocityIcon from '@/components/icons/icon-cryptocity.vue'

defineProps({
  clusters: {
    type: Object as PropType<Cluster[]>,
    required: true,
  },
  cryptocities: {
    type: Object as PropType<CryptocityMarker>,
    required: true,
  },
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ cluster: Cluster }>()

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
  <DefineTemplate v-slot="{ cluster: { count, diameter } }">
    <div class="grid text-sm font-bold text-white transition-colors rounded-full shadow cursor-pointer aspect-square place-content-center bg-space hover:bg-[#35395A] focus:bg-[#35395A] ring-white/20 ring-2 ring-offset-1 ring-offset-white/40 max-desktop:clickable" :style="`width: ${diameter}px; font-size: clamp(14px, ${0.14 * count + 4}px, 18px)`">
      {{ count < 100 ? count : '99+' }}
    </div>
  </DefineTemplate>

  <CustomMarker
    v-for="({ lat, lng, count, expansionZoom, diameter, id }) in clusters"
    :key="`${cryptocities?.[id]?.length > 0 ? cryptocities[id][0].cryptocity : 'c'}-${id}`"
    :options="{ position: { lat, lng }, anchorPoint: 'CENTER' }"
    data-custom-marker
  >
    <ReuseTemplate v-if="cryptocities[id] === undefined" :cluster="{ lat, lng, count, expansionZoom, diameter, id }" @click="onClusterClick({ lat, lng }, expansionZoom)" />

    <ul v-else class="relative group">
      <li class="relative z-10"><ReuseTemplate :cluster="{ lat, lng, count, expansionZoom, diameter, id }" @click="onClusterClick({ lat, lng }, expansionZoom)" /></li>
      <li v-for="city in cryptocities[id]" :key="city.cryptocity" class="clickable-sm absolute top-0 z-0 transition-transform scale-[0.85] translate-x-3 group-hover:scale-100 group-hover:translate-x-[calc(100%+8px)]">
        <div class="grid p-1 bg-white rounded-full shadow cursor-pointer aspect-square place-content-center" :style="`width: ${diameter}px`">
          <CryptocityIcon class="w-full transition-transform translate-x-0.5 group-hover:translate-x-0 -rotate-45 group-hover:rotate-0" />
        </div>
      </li>
    </ul>
  </CustomMarker>
</template>
