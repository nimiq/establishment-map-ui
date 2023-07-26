<script setup lang="ts">
import DesktopView from "@/components/DesktopView.vue"
import MobileView from "@/components/MobileView.vue"
import { useBreakpoints } from "@vueuse/core"
import { screens } from 'tailwindcss-nimiq-theme'

const isMobile = useBreakpoints(screens).smaller('md')
</script>

<template>
  <MobileView v-if="isMobile" />
  <DesktopView v-else />
</template>
