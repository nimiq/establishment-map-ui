import type { BoundingBox } from '~~/types/map'
import type { Map as OlMap } from 'ol'
import type { Extent } from 'ol/extent'
import { fromLonLat, toLonLat } from 'ol/proj'

export const useMap2 = defineStore('map', () => {
  const mapInstance = shallowRef<OlMap>()
  const mapLoaded = ref(false)
  const boundingBox = ref<BoundingBox>()

  const lat = useRouteParams('lat', '', { transform: Number, mode: 'replace' })
  const lng = useRouteParams('lng', '', { transform: Number })
  const zoom = useRouteParams('zoom', '', { transform: Number })
  const center = computed(() => lat.value && lng.value ? [lng.value, lat.value] : undefined)

  const router = useRouter()
  const route = useRoute()

  watchDebounced(
    boundingBox,
    () => {
      router.push({
        name: '@lat,lng,zoomz',
        params: { lat: lat.value.toString(), lng: lng.value.toString(), zoom: zoom.value.toString() },
        query: { ...route.query, uuid: useLocations().selectedUuid || undefined },
        replace: true,
      })
    },
    { debounce: 500, maxWait: 1000 },
  )

  const increaseZoom = () => {
    if (mapInstance.value) {
      const view = mapInstance.value.getView()
      view.setZoom(view.getZoom()! + 1)
    }
  }

  const decreaseZoom = () => {
    if (mapInstance.value) {
      const view = mapInstance.value.getView()
      view.setZoom(view.getZoom()! - 1)
    }
  }

  interface SetPositionOptions {
    smooth?: boolean
    clearMarkers?: boolean
  }

  function setPosition(p?: [number, number] | Extent, { smooth, clearMarkers }: SetPositionOptions = {}) {
    if (!mapInstance.value || !p)
      return

    const view = mapInstance.value.getView()

    if (Array.isArray(p) && p.length === 2) {
      const center = fromLonLat(p)
      if (smooth)
        view.animate({ center })
      else
        view.setCenter(center)
    }
    else if (p.length === 4) {
      if (smooth)
        view.fit(p, { duration: 1000 })
      else
        view.fit(p)
    }

    if (clearMarkers)
      useMarkers().clearMarkers()
  }

  async function goToPlaceId(_placeId?: string) {
    console.warn('goToPlaceId is not implemented for OpenLayers')
  }

  function updateCenterAndZoom() {
    if (mapInstance.value) {
      const view = mapInstance.value.getView()
      const center = view.getCenter()
      if (center) {
        const [longitude, latitude] = toLonLat(center)
        lat.value = latitude!
        lng.value = longitude!
      }
      zoom.value = view.getZoom()!
    }
  }

  function updateBoundingBox() {
    if (mapInstance.value) {
      const extent = mapInstance.value.getView().calculateExtent(mapInstance.value.getSize())
      const [swlng, swlat, nelng, nelat] = toLonLat(extent)
      boundingBox.value = { swlat, swlng, nelat, nelng } as BoundingBox
    }
  }

  return {
    map: mapInstance,
    mapLoaded,
    lat,
    lng,
    setPosition,
    center,
    zoom,
    boundingBox,
    increaseZoom,
    decreaseZoom,
    goToPlaceId,
    updateCenterAndZoom,
    updateBoundingBox,
  }
})
