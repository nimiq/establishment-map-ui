import { defineStore } from 'pinia'
import type { AnyProps } from 'supercluster'
import Supercluster from 'supercluster'
import { ref } from 'vue'
import type { BoundingBox, Cluster, Location, Point } from '@/types'

export const useCluster = defineStore('cluster', () => {
  const clusters = ref<Cluster[]>([])

  const BASE_RADIUS = 140 // This is the max cluster radius at zoom level 0
  const DECAY_FACTOR = 1.05 // You can adjust this to change how fast the radius decreases

  function locationToPoint({ lat, lng, name }: Location): Supercluster.PointFeature<AnyProps> {
    return { type: 'Feature', geometry: { type: 'Point', coordinates: [lng, lat] }, properties: { name } }
  }

  const clusterAlgorithm = ref<Supercluster>()

  function cluster(locations: Location[], { neLat, neLng, swLat, swLng }: BoundingBox, zoom: number) {
    clusterAlgorithm.value = new Supercluster({
      radius: BASE_RADIUS / DECAY_FACTOR ** zoom,
    })
    clusterAlgorithm.value.load(locations.map(locationToPoint))
    clusters.value = clusterAlgorithm.value.getClusters([swLng, swLat, neLng, neLat], zoom).map((c) => {
      const center: Point = { lng: c.geometry.coordinates[0], lat: c.geometry.coordinates[1] }
      const count = c.properties.point_count || 1
      const name = count === 1 ? c.properties.name : ''
      return { center, count, clusterId: c.properties.cluster_id, name }
    })
  }

  return {
    clusterAlgorithm,
    cluster,
    clusters,
  }
})
