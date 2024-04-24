<script setup lang="ts">
const MobileView = defineAsyncComponent(() => import('@/components/MobileView.vue'))
const DesktopView = defineAsyncComponent(() => import('@/components/DesktopView.vue'))

const { isMobile } = storeToRefs(useApp())
</script>

<template>
  <MobileView v-if="isMobile" />
  <DesktopView v-else />
</template>
