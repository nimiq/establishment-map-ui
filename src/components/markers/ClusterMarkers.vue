<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Cluster } from 'types'
import type { PropType } from 'vue'
import { CustomMarker } from 'vue3-google-map'
import CryptocityMarker from './CryptocityMarker.vue'
import { useMap } from '@/stores/map'
import { useCryptocities } from '@/stores/cryptocities'

defineProps({
  clusters: {
    type: Object as PropType<Cluster[]>,
    required: true,
  },
})

const { setPosition } = useMap()
const { zoom } = storeToRefs(useMap())
const { recentlyAttachedCryptocities } = storeToRefs(useCryptocities())

function onClusterClick({ expansionZoom, lat, lng }: Cluster) {
  // To make it more fluid if zoom is lower than 13, the minimum zoom change must be 3
  const newZoom = expansionZoom < 13 ? Math.max(expansionZoom, zoom.value + 3) : expansionZoom
  setPosition({ center: { lat, lng }, zoom: newZoom })
}
</script>

<template>
  <CustomMarker
    v-for="c in clusters"
    :key="c.id"
    :options="{ position: c, anchorPoint: 'CENTER' }"
    data-custom-marker
    :class="c.cryptocities.length > 0 && 'z-10'"
  >
    <ul class="relative group [--hover:0] hover:[--hover:1]" :style="`padding-right: calc(var(--hover) * ${c.diameter * c.cryptocities.length + 8}px)`">
      <li class="relative z-10">
        <div class="grid text-sm font-bold text-white transition-colors rounded-full shadow cursor-pointer aspect-square place-content-center bg-space hover:bg-[#35395A] focus:bg-[#35395A] ring-white/20 ring-2 ring-offset-1 ring-offset-white/40 max-desktop:clickable" :style="`width: ${c.diameter}px; font-size: clamp(14px, ${0.14 * c.count + 4}px, 18px)`" @click="onClusterClick(c)">
          {{ c.count < 100 ? c.count : '99+' }}
        </div>
      </li>

      <li v-for="(city, i) in c.cryptocities" :key="city" :style="`--index: ${i + 1}`">
        <CryptocityMarker
          :cryptocity="city"
          class="
            absolute top-0 z-0 transition-transform children:transition-transform
            translate-x-[calc(var(--index)*12px)] group-hover:translate-x-[calc(100%*var(--index)+var(--index)*8px)]
            children:translate-x-0.5 group-hover:children:translate-x-0 -rotate-45 group-hover:rotate-0"
          :class="recentlyAttachedCryptocities.includes(city) && 'animate-cryptocity'"
          :style="`width: ${c.diameter}px;`"
        />
      </li>
    </ul>
  </CustomMarker>
</template>
