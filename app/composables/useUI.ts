import { breakpointsTailwind } from '@vueuse/core'

export const isMobile = useBreakpoints(breakpointsTailwind).smaller('md')

export function useUIParams() {
  const { zoom } = storeToRefs(useMap2())

  // We track if the user has hidden the search box hint using localStorage
  const cssVar = useCssVar('--dynamic-block', globalThis.document?.documentElement)
  const showSearchBoxHintStorage = useLocalStorage('showSearchBoxHintStorage', true)

  // We hide the hint in mobile devices
  const showSearchBoxHint = computed(() => showSearchBoxHintStorage.value && !isMobile.value)

  const { cryptocitiesInView } = storeToRefs(useCryptocities())
  const cryptocityBanner = computed(() => cryptocitiesInView.value.filter(c => c.showCardAtZoom <= zoom.value).at(0))
  const showCryptocityBanner = computed(() => !!cryptocityBanner.value)

  watch([showCryptocityBanner, showSearchBoxHint], ([v1, v2]) => cssVar.value = v1 || v2 ? '1' : '0', { immediate: true })

  return {
    fillMarker: computed(() => zoom.value >= 13),
    showLocationName: computed(() => zoom.value >= 11),
    hideSearchBoxHint: () => showSearchBoxHintStorage.value = false,
    showSearchBoxHint,
    cryptocityBanner,
    showDynamicBlock: computed(() => showSearchBoxHint.value || showCryptocityBanner.value),
  }
}
