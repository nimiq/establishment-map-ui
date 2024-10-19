<script setup lang="ts">
import { NuxtLayout } from '#components'

if (import.meta.dev)
  useDark() // Take care of your eyes

defineRouteRules({ ssr: false, prerender: true })
definePageMeta({
  keepalive: true,
  key: 'Map',
})

// const route = useRoute()

// function getSelectedUuid() {
//   const { output: uuid, success: uuidSuccess } = safeParse(UuidSchema, route.query.uuid)
//   return uuidSuccess ? uuid : undefined
// }

// const maybeUuid = getSelectedUuid()
// const { selectedUuid } = storeToRefs(useLocations())
// if (maybeUuid)
//   selectedUuid.value = maybeUuid
</script>

<template>
  <NuxtLayout name="desktop" />
</template>
