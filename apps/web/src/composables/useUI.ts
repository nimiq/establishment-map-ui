import { breakpointsTailwind } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'

export const isMobile = useBreakpoints(breakpointsTailwind).smaller('md')

const { zoom } = storeToRefs(useMap())
export const fillMarker = computed(() => zoom.value >= 13)
export const showLocationName = computed(() => zoom.value >= 11)

enum UI {
  // UI optimized for mobile devices, specially the Nimiq Pay App
  Compact = 'compact',
}

// By default layout is undefined => default layout
export const layout = useRouteQuery<UI>('layout')
