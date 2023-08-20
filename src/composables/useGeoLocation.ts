import { useGeolocation } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { EstimatedPosition } from '@/types'

interface GeoIpResponse {
  location?: {
    longitude: string
    latitude: string
    accuracy_radius: number
  }
  country?: string
  city?: string
  city_names?: { [language: string]: string }
}

export function useGeoIp() {
  const ipPositionError = ref()
  const ipPosition = ref<EstimatedPosition>()
  async function geolocateIp() {
    const url = new URL('https://geoip.nimiq-network.com:8443/v1/locate')
    const response = await fetch(url).catch((e) => {
      ipPositionError.value = `Failed to fetch IP location: ${e}`
    })
    if (!response)
      return undefined

    const json: GeoIpResponse = await response.json()
    if (!json || !json.location || !json.location.latitude || !json.location.longitude) {
      ipPositionError.value = `Failed to fetch IP location. ${JSON.stringify(json)}`
      return undefined
    }

    const { latitude, longitude, accuracy_radius = 300 } = json.location
    ipPosition.value = {
      center: {
        lat: Number.parseFloat(latitude),
        lng: Number.parseFloat(longitude),
      },
      accuracy: accuracy_radius * 1000, // km -> m
    }
  }

  const { isSupported: browserLocationIsSupported, resume: geolocateUser, coords: browserCoords, error: errorBrowser } = useGeolocation({
    immediate: false,
  })

  return {
    // Lazy computed property. Will only be computed when we read it.
    geolocateIp,
    ipPositionError,
    ipPosition,

    // We need to trigger geolocation manually. Then we can read the coords.
    browserLocationIsSupported,
    errorBrowser,
    geolocateUser,
    browserPosition: computed<EstimatedPosition>(() => ({
      center: {
        lat: browserCoords.value.latitude,
        lng: browserCoords.value.longitude,
      },
      accuracy: browserCoords.value.accuracy,
    })),
  }
}
