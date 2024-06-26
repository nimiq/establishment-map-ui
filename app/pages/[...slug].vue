<script setup lang="ts">
import type { MapPosition } from '~~/packages/types/src';

// TODO locaiton uuid

// Costa Rica
const FALLBACK_POSITION: MapPosition = { center: { lat: 9.6301892, lng: -84.2541844 }, zoom: 9 }

const { setPosition } = useMap()

const { geolocateIp } = useGeoIp()
const { ipPositionError, ipPosition } = storeToRefs(useGeoIp())

onMounted(async () => {
  if (!import.meta.client)
    return
  await geolocateIp()

  if (!ipPositionError.value && ipPosition.value) {
    // eslint-disable-next-line no-console
    console.log(`Using user's location: ${JSON.stringify(ipPosition.value)}`)
    setPosition(ipPosition.value)
  } else {
    console.warn(`Error getting user's location: ${ipPositionError.value}. Using fallback position. ${JSON.stringify(FALLBACK_POSITION)}`)
    setPosition(FALLBACK_POSITION)
  }
})
</script>

<template>
  <NuxtLayout name="desktop" />
</template>
