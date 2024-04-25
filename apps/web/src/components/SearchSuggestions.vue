<script setup lang="ts">
import { AutocompleteStatus, GoogleSuggestion, LocationSuggestion, PredictionSubstring } from '@/composables/useAutocomplete';

defineProps<{ status: AutocompleteStatus, googleSuggestions: GoogleSuggestion[], locationSuggestions: LocationSuggestion[] }>()

function highlightMatches(str: string, matches: PredictionSubstring[]) {
  // Split into unicode chars because match positions in google.maps.places.AutocompletePrediction["matched_substrings"]
  // are based on unicode chars, as opposed to surrogate pairs of Javascript strings for Unicode chars on astral planes
  // (see https://mathiasbynens.be/notes/javascript-unicode)
  const parts = [...str]

  // Sanitize potential html in input string to mitigate risk of XSS because the result will be fed to v-html. Note that
  // this manipulation does not change indices/positions of our string parts (initial unicode characters).
  for (let i = 0; i < parts.length; ++i) {
    if (parts[i] === '<')
      parts[i] = '&lt;'
    else if (parts[i] === '>')
      parts[i] = '&gt;'
  }

  // Make matches bold. Note that our manipulations do not change indices/positions of our string parts (initial unicode
  // characters), thus we don't have to adapt match offsets of subsequent matches. Additionally, matches are probably
  // not overlapping, but it would also not hurt.
  for (const match of matches || []) {
    parts[match.offset] = `<b>${parts[match.offset]}`
    parts[match.offset + match.length - 1] = `${parts[match.offset + match.length - 1]}</b>`
  }

  return parts.join('')
}
</script>

<template>
  <ComboboxContent absolute bg-neutral-0 inset-x-0 data-suggestions>
    <div p-16 text-neutral-800 v-if="status !== AutocompleteStatus.WithResults">
      <ComboboxEmpty v-if="status === AutocompleteStatus.NoResults">
        {{ $t('Nothing found.') }}
      </ComboboxEmpty>
      <span v-else-if="status === AutocompleteStatus.Loading">
        {{ $t('Loading...') }}
      </span>
      <span v-else-if="status === AutocompleteStatus.Initial">
        {{ $t('Start typing...') }}
      </span>
      <span v-else-if="status === AutocompleteStatus.Error">
        {{ $t('Error loading results.') }}
      </span>
    </div>
    <template v-else>
      <ComboboxGroup flex="~ col">
        <ComboboxLabel label text="12 neutral-700" px-16 py-8>
          {{ $t('Crypto Locations') }}
        </ComboboxLabel>

        <ComboboxItem v-for="s in locationSuggestions" :key="s.uuid" :value="s" px-16 py-12 hocus:bg-neutral-100
          transition-colors cursor-pointer @click="() => useLocations().goToLocation(s.uuid, { open: true })">
          <span class="block truncate" v-html="highlightMatches(s.name, s.matchedSubstrings)" />
        </ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator bg-neutral-100 h-2 my-12 />

      <ComboboxGroup>
        <ComboboxLabel label text="12 neutral-700" px-16 py-8>
          {{ $t('Results from Google') }}
        </ComboboxLabel>

        <ComboboxItem v-for="s in googleSuggestions" :key="s.placeId" :value="s" px-16 py-12 hocus:bg-neutral-100
          transition-colors cursor-pointer @click="() => useMap().goToPlaceId(s.placeId)">
          <span class="block truncate" v-html="highlightMatches(s.label, s.matchedSubstrings)" />
        </ComboboxItem>
      </ComboboxGroup>
    </template>

  </ComboboxContent>
</template>
