import { breakpointsTailwind } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'

export const isMobile = useBreakpoints(breakpointsTailwind).smaller('md')

export function useUIParams() {
  const { zoom } = storeToRefs(useMap())

  // We track if the user has hidden the search box hint using localStorage
  const cssVar = '--dynamic-block'
  const showSearchBoxHintStorage = useLocalStorage('showSearchBoxHintStorage', true)
  watch(showSearchBoxHintStorage, v => document.documentElement.style.setProperty(cssVar, v ? '1' : '0'))

  // We hide the hint in mobile devices
  const showSearchBoxHint = computed(() => showSearchBoxHintStorage.value && !isMobile.value)

  const { cryptocitiesInView } = storeToRefs(useCryptocities())
  const cryptocityBanner = computed(() => cryptocitiesInView.value.filter(c => c.showCardAtZoom <= zoom.value).at(0))
  const showCryptocityBanner = computed(() => !!cryptocityBanner.value)
  watch(showCryptocityBanner, v => document.documentElement.style.setProperty(cssVar, v ? '1' : '0'), { immediate: true })


  return {
    fillMarker: computed(() => zoom.value >= 13),
    showLocationName: computed(() => zoom.value >= 11),
    showSearchBoxHint,
    cryptocityBanner,
    showDynamicBlock: computed(() => showSearchBoxHint.value || showCryptocityBanner.value),
  }
}

export enum Layout {
  Default = 'default',

  // UI optimized for mobile devices, specially the Nimiq Pay App
  Compact = 'compact',
}

export function useLayout() {
  const layoutQuery = useRouteQuery<Layout | undefined>('layout', undefined, { route: useRoute() })

  const MobileView = defineAsyncComponent(() => import('@/components/MobileView.vue'))
  const DesktopView = defineAsyncComponent(() => import('@/components/DesktopView.vue'))
  const CompactView = defineAsyncComponent(() => import('@/components/CompactView.vue'))

  const component = computed(() => {
    switch (layoutQuery.value) {
      case Layout.Compact: return CompactView
      default: return isMobile.value ? MobileView : DesktopView
    }
  })

  return {
    component
  }
}
