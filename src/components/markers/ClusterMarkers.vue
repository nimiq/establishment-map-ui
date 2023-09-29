<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Cluster } from 'types'
import type { PropType } from 'vue'
import { CustomMarker } from 'vue3-google-map'
import { useBreakpoints } from '@vueuse/core'
import { screens } from 'tailwindcss-nimiq-theme'
import { OnClickOutside } from '@vueuse/components'
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
const { newCitiesInView } = storeToRefs(useCryptocities())
const isMobile = useBreakpoints(screens).smaller('md')

function toggleClusterExpansion({ id }: Cluster, event?: Event) {
  const clusterUl = document.querySelector(`[data-cluster-id="${id}"]`) as HTMLElement
  const current = clusterUl.style.getPropertyValue('--expanded')
  // If it is outside the cluster and it is 0, do nothing
  if (event && current === '0' && !clusterUl.contains(event.target as Node))
    return
  clusterUl.style.setProperty('--expanded', current === '1' ? '0' : '1')
}

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
    :options="{ position: c, anchorPoint: c.cryptocities.length === 0 ? 'CENTER' : 'LEFT_CENTER' }"
    data-custom-marker
    :class="c.cryptocities.length > 0 && 'z-10'"
  >
    <OnClickOutside @trigger="toggleClusterExpansion(c, $event)">
      <ul
        :data-cluster-id="c.id"
        class="relative group [--expanded:0] hover:[--expanded:1]"
        :style="`
          left: calc(-1 * ${c.diameter / 2}px); /* To center it after we set it to the left in the anchor point */
          padding-right: calc(var(--expanded) * ${c.diameter * c.cryptocities.length + 8}px)
        `"
      >
        <li class="relative z-10">
          <div
            class="grid text-sm font-bold text-white transition-colors rounded-full shadow cursor-pointer aspect-square place-content-center bg-space hover:bg-[#35395A] focus:bg-[#35395A] ring-white/20 ring-2 ring-offset-1 ring-offset-white/40 max-desktop:clickable" :style="`width: ${c.diameter}px; font-size: clamp(14px, ${0.14 * c.count + 4}px, 18px)`"
            @pointerdown="isMobile && c.cryptocities.length > 0 ? toggleClusterExpansion(c) : onClusterClick(c)"
          >
            {{ c.count < 100 ? c.count : '99+' }}
          </div>
        </li>

        <li
          v-for="(city, i) in c.cryptocities" :key="city"
          class="absolute top-0 z-0 transition"
          :class="newCitiesInView.includes(city) && 'animate-cryptocity'"
          :style="`
          --index: ${i + 1};
          width: ${c.diameter}px;
          --offset-1: calc(var(--index) * 12px); /* If is not expanded */
          --offset-2: calc((100% * var(--index)) + (var(--index) * 8px)); /* If is expanded */
          transform: translateX(calc(var(--offset-1) * (1 - var(--expanded)) + var(--offset-2) * var(--expanded))) rotate(calc((1 - var(--expanded)) * -90deg));
          padding-left: calc(1 - var(--expanded) * 2px);
        `"
        >
          <CryptocityMarker :cryptocity="city" />
        </li>
      </ul>
    </OnClickOutside>
  </CustomMarker>
</template>
