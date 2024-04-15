<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { breakpointsTailwind } from '@vueuse/core'
import { computed, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import SearchBox from '@/components/atoms/NewSearchBox.vue'
import CryptoMapModal from '@/components/elements/CryptoMapModal.vue'
import { useAutocomplete } from '@/composables/useAutocomplete'
import { useMap } from '@/stores/map'
import { useLocations } from '@/stores/locations'
import { useApp } from '@/stores/app'
import { useMarkers } from '@/stores/markers'
import { GoogleSuggestion, LocationSuggestion } from 'types'

defineEmits({
  open: (value: boolean) => value,
})

const { query, querySearch, googleSuggestions, locationSuggestions } = useAutocomplete()

const { singles } = storeToRefs(useMarkers())
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function onSelect(suggestion?: Suggestion) {
  if (!suggestion)
    return
  switch (suggestion.type) {
    case SuggestionType.GoogleLocation:
    case SuggestionType.Region:
      break
    case SuggestionType.Location:

      break
  }

  useApp().hideSearchBoxHint()
}


function onGoogleSuggestionsSelected(suggestion: GoogleSuggestion) {
  useMap().goToPlaceId(suggestion.placeId)
}

async function onLocationSuggestionsSelected(suggestion: LocationSuggestion) {
  const locationExists = await useLocations().goToLocation(suggestion.uuid)
  if (!locationExists) return

  while (!singles.value.some(s => s.uuid === suggestion.uuid))
    await sleep(100) // Try to wait for the item to be added
  await nextTick() // Wait for the marker to be rendered

  // once the marker is rendered, we can trigger the click event to open the modal
  const trigger = document.querySelector(`[data-trigger-uuid="${suggestion.uuid}"]`) as HTMLElement
  trigger?.click()
}

const { shouldShowSearchBoxHint } = storeToRefs(useApp())
const showHint = computed(() => shouldShowSearchBoxHint.value && useBreakpoints(breakpointsTailwind).greaterOrEqual('md').value)
</script>

<template>
  <header relative z-10 flex="~ items-center gap-8 desktop:gap-16" w-full p-24 desktop:p-16 pl-16>
    <div i-nimiq:logos-crypto-map text-24 aria-hidden shrink-0 />
    <!-- <SearchBox
      :autocomplete="querySearch" :suggestions="suggestions" :status="status" flex-1 rounded-full
      combobox-options-classes="rounded-t-0 rounded-b-2xl desktop:w-[320px] desktop:top-[88px] desktop:left-6 max-desktop:w-full max-desktop:!top-[78px]"
      size="sm" :placeholder="$t('Search Map')" @selected="onSelect" @open="$emit('open', $event)"
    /> -->
    <SearchBox
      v-model:query="query" :placeholder="$t('Search Map')"
      @google-suggestion-selected="onGoogleSuggestionsSelected" @location-suggestion-selected="onLocationSuggestionsSelected"
      :google-suggestions :location-suggestions :autocomplete="querySearch" />
    <CryptoMapModal />
  </header>

  <!-- We need to hardcode the height, otherwise the desktop list will break -->
  <p v-if="showHint" class="p-5 text-xs border-t text-space/60 border-space/10 text-pretty" style="height: 88px">
    {{ $t('Enter country, city or zip code to discover locations that accept Bitcoin, Nimiq and other crypto-currencies.')
    }}
  </p>
</template>
