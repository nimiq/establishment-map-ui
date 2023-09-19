<script setup lang="ts">
import type { CryptocityCluster } from 'types'
import { Cryptocity } from 'types'
import { ref } from 'vue'
import CryptocityCard from './CryptocityCard.vue'
import { cryptocitiesContent } from '@/assets-dev/cryptocities-assets'

const cryptocity: CryptocityCluster = {
  ...cryptocitiesContent[Cryptocity.SanJose],
  count: 12,
  id: 1,
  lng: 1,
  lat: 1,
  expansionZoom: 4,
  city: Cryptocity.SanJose,
}

const open = ref(false)
</script>

<template>
  <Story title="Cryptocity Card" :layout="{ type: 'grid', width: '360px' }">
    <CryptocityCard :cryptocity="cryptocity" :show-description="open" @icon-click="open = !open" />
  </Story>
</template>
