import { useDebounceFn, useLocalStorage } from '@vueuse/core'
import { defineStore, storeToRefs } from 'pinia'
import type { BoundingBox, CryptocityMarker, CryptocityMemoized } from 'types'
import { getCryptocityPolygon } from 'database'
import { addBBoxToArea, bBoxIsWithinArea, bBoxesIntersect, distance } from 'shared'
import { ref, watch } from 'vue'
import { useMap } from './map'
import { useCluster } from './cluster'
import { cryptocitiesData } from '@/assets-dev/cryptocities-assets.ts'
import { DATABASE_ARGS } from '@/shared'

export const useCryptocity = defineStore('cryptocities', () => {
  const { map, boundingBox, zoom } = storeToRefs(useMap())
  const { clustersInView } = storeToRefs(useCluster())

  const cryptocities = useLocalStorage('cryptocities', cryptocitiesData)

  // The cryptocities markers will be set:
  // - In the centroid position if they do not clash with any cluster
  // - Attached to the cluster if they clash with any cluster
  const cryptocitiesMarkers = ref<CryptocityMarker>({})
  const memoizedMarkers = new Map<number /* zoom */, CryptocityMemoized>()

  async function loadCryptocities(boundingBox: BoundingBox, zoom: number, map: google.maps.Map) {
    const memoized = memoizedMarkers.get(zoom) || { area: { type: 'MultiPolygon', coordinates: [] }, markers: {} }
    if (bBoxIsWithinArea(boundingBox, memoized.area)) {
      cryptocitiesMarkers.value = memoized.markers
      return
    }

    // Check if the bounding box of any cryptocity is in the view
    const cryptocitiesInView = Object.values(cryptocities.value).filter(p => bBoxesIntersect(p.boundingBox, boundingBox))
    if (cryptocitiesInView.length === 0)
      return

    await Promise.allSettled(cryptocitiesInView.map(async city => city.polygon ||= await getCryptocityPolygon(DATABASE_ARGS, city.cryptocity)!))

    const markers: CryptocityMarker = {}
    for (const city of cryptocitiesInView) {
      city.polygon ||= await getCryptocityPolygon(DATABASE_ARGS, city.cryptocity)!

      // check if it clashes
      const clusterToBeAttached = clustersInView.value.filter(c => distance(c, city.centroid) < c.diameter + 8 /* padding */)[0]

      // Add it to
      const key = clusterToBeAttached?.id ?? -1
      if (!markers[key])
        markers[key] = []
      markers[key].push(city)
    }

    memoized.area = addBBoxToArea(boundingBox, memoized.area)
    memoized.markers = markers
    cryptocitiesMarkers.value = markers

    // map.data.addGeoJson(city.polygon as object)
    map.data.setStyle({
      fillColor: 'rgb(31 35 72)',
      fillOpacity: 0.4,
      strokeWeight: 0,
    })
  }

  const loadCryptocitiesDebouncer = useDebounceFn(loadCryptocities, 600)

  watch(clustersInView, async () => {
    if (!boundingBox.value || !map.value)
      return
    loadCryptocitiesDebouncer(boundingBox.value, zoom.value, map.value)
  })

  return {
    cryptocities: cryptocitiesMarkers,
  }
})
