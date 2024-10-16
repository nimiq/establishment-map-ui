import type { Feature, MultiPolygon } from 'geojson'
import { addBBoxToArea, bBoxIsWithinArea, getItemsWithinBBox } from 'geo'
import type { BoundingBox, MapLocation } from 'types'
import { useRouteQuery } from '@vueuse/router'
import { parseLocation } from '@/shared'

export const useLocations = defineStore('locations', () => {
  // Reduce redundant database fetches by reusing fetched locations by tracking the areas explored by the user
  const visitedAreas = ref<Feature<MultiPolygon>>()

  // const { payload: locationsMap } = useExpiringStorage('locations', {
  //   defaultValue: {} as Record<string, MapLocation>,
  //   expiresIn: 7 * 24 * 60 * 60 * 1000,
  //   timestamp: useApp().timestamps?.locations,
  // })
  const locationsMap = ref<Record<string, MapLocation>>({})
  const locations = computed(() => Object.values(locationsMap.value))

  function setLocations(locations: MapLocation[]) {
    locations.forEach(location => locationsMap.value[location.uuid] = location)
  }

  async function getLocations(boundingBox: BoundingBox): Promise<MapLocation[]> {
    if (bBoxIsWithinArea(boundingBox, visitedAreas.value)) {
      // We already have scanned this area, no need to fetch from the database
      return getItemsWithinBBox(locations.value, boundingBox) // Filter locations by bounding box
    }

    // New area, we need to fetch from the database
    const url = new URL('https://crypto-map.nuxt.dev/api/locations/')
    url.searchParams.append('nelat', boundingBox.neLat.toString())
    url.searchParams.append('nelng', boundingBox.neLng.toString())
    url.searchParams.append('swlat', boundingBox.swLat.toString())
    url.searchParams.append('swlng', boundingBox.swLng.toString())
    const res = await fetch(url)
    const rawLocations = await res.json()
    if (!rawLocations)
      return []
    const newLocations = rawLocations.map(parseLocation)
    setLocations(newLocations)
    visitedAreas.value = addBBoxToArea(boundingBox, visitedAreas.value)
    return newLocations
  }

  async function getLocationByUuid(uuid: string) {
    if (uuid in locationsMap.value)
      return locationsMap.value[uuid]

    const res = await fetch(`https://crypto-map.nuxt.dev/api/locations/${uuid}`)
    const location = parseLocation(await res.json())
    if (!location)
      return
    locationsMap.value[uuid] = location
    return location
  }

  const selectedUuid = useRouteQuery<string | undefined>('uuid') // No need to check for string[]. UUID checked in router.ts

  interface GoToLocationOptions {
    open?: boolean
  }

  async function goToLocation(uuid: string, { open = false }: GoToLocationOptions = {}) {
    const location = await getLocationByUuid(uuid)
    if (!location)
      return false

    selectedUuid.value = uuid

    useMap().setPosition({ center: { lat: location.lat, lng: location.lng }, zoom: 19 })

    if (open) {
      const { singles } = storeToRefs(useMarkers())
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
      while (!singles.value.some(s => s.uuid === uuid))
        await sleep(100) // Try to wait for the item to be added
      await nextTick() // Wait for the marker to be rendered

      // once the marker is rendered, we can trigger the click event to open the modal
      const trigger = document.querySelector(`[data-trigger-uuid="${uuid}"]`) as HTMLElement
      trigger?.click()
    }

    return true
  }

  return {
    getLocations,
    getLocationByUuid,
    locations,
    setLocations,
    visitedAreas,

    selectedUuid,
    goToLocation,
  }
})
