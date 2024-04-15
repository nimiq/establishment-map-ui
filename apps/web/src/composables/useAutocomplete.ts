import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
import { AutocompleteStatus, GoogleSuggestion, LocationSuggestion } from 'types'
import { searchLocations } from 'database'
import { detectLanguage } from '@/i18n/i18n-setup'
import { useMap } from '@/stores/map'
import { getAnonDatabaseArgs } from '@/shared'

enum GoogleAutocompleteFor {
  Location = 'establishment',
  Regions = '(regions)',
}

export function useAutocomplete() {
  const query = ref<string>('')
  const status = ref<AutocompleteStatus>(AutocompleteStatus.Initial)
  const googleSuggestions = ref<GoogleSuggestion[]>([])
  const locationSuggestions = ref<LocationSuggestion[]>([])

  function clearSuggestions() {
    googleSuggestions.value = []
    locationSuggestions.value = []
  }

  // Google Autocomplete
  const sessionToken = ref<google.maps.places.AutocompleteSessionToken>()
  const autocompleteService = ref<google.maps.places.AutocompleteService>()

  async function autocompleteGoogle(autocompleteFor: GoogleAutocompleteFor) {
    sessionToken.value ||= new google.maps.places.AutocompleteSessionToken()
    autocompleteService.value ||= new google.maps.places.AutocompleteService()

    const request: google.maps.places.AutocompletionRequest = {
      input: query.value,
      sessionToken: sessionToken.value,
      types: [autocompleteFor],
      language: detectLanguage(),
      ...(autocompleteFor === GoogleAutocompleteFor.Regions
        ? { locationBias: useMap().map?.getBounds() }
        : undefined),
    }

    const fn = autocompleteFor === GoogleAutocompleteFor.Regions ? 'getQueryPredictions' : 'getPlacePredictions'
    await autocompleteService.value?.[fn](request, (predictions, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions)
        return
      googleSuggestions.value = predictions
        .filter(p => !!p.place_id)
        .map(p => ({
          placeId: p.place_id as string,
          label: p.description,
          matchedSubstrings: p.matched_substrings,
        } satisfies GoogleSuggestion))

      /* eslint-disable no-console */
      console.group(`🔍 Google Autocomplete "${query}"`)
      console.table(googleSuggestions)
      console.groupEnd()
      /* eslint-enable no-console */
    })
  }

  async function autocompleteLocations() {
    locationSuggestions.value = await searchLocations(await getAnonDatabaseArgs(), query.value)
  }

  // If we search just for new candidates, we don't need to search in the database
  // and we just search locations in Google
  async function querySearch(justNewCandidates = false) {
    // eslint-disable-next-line no-console
    console.group(`🔍 Autocomplete "${query}"`)

    status.value = AutocompleteStatus.Loading
    if (!query) {
      clearSuggestions()
      return
    }

    const result = justNewCandidates
      ? await Promise.allSettled([autocompleteGoogle(GoogleAutocompleteFor.Location)])
      : await Promise.allSettled([autocompleteLocations(), autocompleteGoogle(GoogleAutocompleteFor.Regions)])

    /* eslint-disable no-console */
    console.log(`Got ${result.length} results`)
    console.log(result)
    console.groupEnd()
    /* eslint-enable no-console */

    if (result.every(r => r.status === 'rejected')) {
      status.value = AutocompleteStatus.Error
      return
    }
    

    status.value = googleSuggestions.value.length || locationSuggestions.value.length ? AutocompleteStatus.WithResults : AutocompleteStatus.NoResults
  }

  const debouncer = useDebounceFn((justNewCandidates: boolean) => querySearch(justNewCandidates), 400)
  return {
    query,
    status,
    googleSuggestions,
    locationSuggestions,
    querySearch: debouncer
  }
}
