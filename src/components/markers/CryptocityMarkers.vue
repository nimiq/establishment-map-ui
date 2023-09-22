<script setup lang="ts">
// import SheetModal from '@/components/atoms/SheetModal.vue'

// defineProps({
//   cryptocities: {
//     type: Object as PropType<CryptocityContent[]>,
//     required: true,
//   },
// })

// const { setPosition } = useMap()
// const { zoom } = storeToRefs(useMap())

// function onClusterClick({ expansionZoom: proposedZoom, lat, lng }: CryptocityCluster) {
//   // To make it more fluid if zoom is lower than 13, the minimum zoom change must be 3
//   const newZoom = proposedZoom < 13 ? Math.max(proposedZoom, zoom.value + 3) : proposedZoom
//   setPosition({ center: { lat, lng }, zoom: newZoom })
// }

// const { smaller } = useBreakpoints(screens)
// const DESKTOP_LAYOUT = 'md' // FIXME This is suppose to be the same value as in the tailwind config
// const isMobile = smaller(DESKTOP_LAYOUT)

// const cryptocityOpen = ref<CryptocityCluster | undefined>()
</script>

<template>
  <h1>1</h1>
  <!-- <CustomMarker
    v-for="cryptocity in cryptocities" :key="cryptocity.id"
    :options="{ position: { lat: cryptocity.lat, lng: cryptocity.lng }, anchorPoint: 'CENTER' }" data-custom-marker
  >
    <CryptocityCard
      :cryptocity="cryptocity" :show-description="cryptocity.city === cryptocityOpen?.city"
      @icon-click="cryptocityOpen = cryptocity.city === cryptocityOpen?.city ? undefined : cryptocity" @click="onClusterClick(cryptocity)"
    />
  </CustomMarker> -->
</template>
