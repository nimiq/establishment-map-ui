<script setup lang="ts">
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
definePageMeta({
  validate: async (route) => {
    const validNumber = (n?: string | string[]) => !!n && typeof n === 'string' && !Number.isNaN(Number(n))
    if (!validNumber(route.lat))
      return 'Invalid latitude'
    if (!validNumber(route.lng))
      return 'Invalid longitude'
    if (!validNumber(route.zoom))
      return 'Invalid zoom'

    const locationUuid = route.query.uuid
    if (locationUuid && !uuidRegex.test(locationUuid))
      return 'Invalid UUID format'
  },
})

const { setPosition } = useMap()
const { params } = useRoute()
// TODO What to do with uuid?
const { lat, lng, zoom } = params

onMounted(() => {
  setPosition({ center: { lat: Number(lat), lng: Number(lng) }, zoom: Number(zoom) })
})
</script>

<template>
  <NuxtLayout name="desktop" />
</template>
