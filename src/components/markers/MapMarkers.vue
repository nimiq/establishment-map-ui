<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ClusterMarkers from './ClusterMarkers.vue'
import CryptocityMarkers from './CryptocityMarkers.vue'
import SingleMarkers from './SingleMarkers.vue'
import { useCluster } from '@/stores/cluster'
import { useMap } from '@/stores/map'

const { clusters, singles, cryptocities } = storeToRefs(useCluster())

const { zoom } = storeToRefs(useMap())
</script>

<template>
  <ClusterMarkers :clusters="clusters" />
  <SingleMarkers :singles="singles" />
  <CryptocityMarkers v-if="zoom <= 12" :cryptocities="cryptocities" />
</template>
