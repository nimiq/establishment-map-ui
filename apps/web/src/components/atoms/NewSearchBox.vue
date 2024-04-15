<script setup lang="ts">
import { useDebounceFn  } from '@vueuse/core'
import type { GoogleSuggestion, LocationSuggestion, PredictionSubstring, } from 'types'
import { ref, watch } from 'vue'
import { Combobox } from 'radix-vue/namespaced'

const props = withDefaults(defineProps<{
  placeholder: string,
  autocomplete: Function,
  locationSuggestions: LocationSuggestion[],
  googleSuggestions: GoogleSuggestion[],
}>(), {})

const query = defineModel('query')

const emit = defineEmits({
  locationSuggestionSelected: (value: LocationSuggestion) => value,
  googleSuggestionSelected: (value: GoogleSuggestion) => value,
  open: (value: boolean) => value,
})


// const userCanCleanInput = computed(() => props.allowClean && query.value !== '' && query.value !== undefined)

const loading = ref(false)

watch(() => query.value, async () => {
  if (query.value === 'undefined')
    query.value = undefined
  if (!query.value)
    return
  loading.value = true
  await props.autocomplete()
  loading.value = false
})

// const slots = useSlots()
// const hasLabel = computed(() => props.label || hasSlot('label'))
// function hasSlot(slotName: 'label') {
//   return slots[slotName] !== undefined
// }

function sanitizeAndHighlightMatches(str: string, matches: PredictionSubstring[]) {
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

function clearInput() {
  query.value = undefined
}

const debouncedRequest = useDebounceFn(
  (isVisible: boolean) => {
    emit('open', isVisible)
  },
  50,
)

function onListVisibilityChange(isVisible: boolean) {
  debouncedRequest(isVisible)
}
</script>

<template>
  <Combobox.Root v-model="query" relative>
    <Combobox.Anchor inline-flex items-center justify-between>
      <Combobox.Input :placeholder="placeholder" input-text rounded-full text-14 />
      <div i-nimiq:magnifying-glass absolute right-12 />
    </Combobox.Anchor>

    <Combobox.Content absolute z-10 w-full bg-neutral-0 of-hidden rounded-b-16 shadow>
      <Combobox.Viewport p-16>
        <Combobox.Empty />

        <Combobox.Group>
          <Combobox.Label>
            {{ $t('Locations') }}
          </Combobox.Label>

          <Combobox.Item v-for="({ name, uuid, matchedSubstrings }) in locationSuggestions" :key="uuid">
            <span class="block truncate" v-html="sanitizeAndHighlightMatches(name, matchedSubstrings)" />
          </Combobox.Item>
        </Combobox.Group>
        <Combobox.Separator />

        <Combobox.Group>
          <Combobox.Label>
            {{ $t('Results from Google') }}
          </Combobox.Label>

          <Combobox.Item v-for="({ label, placeId, matchedSubstrings }) in googleSuggestions" :key="placeId">
            <span class="block truncate" v-html="sanitizeAndHighlightMatches(label, matchedSubstrings)" />
          </Combobox.Item>
        </Combobox.Group>

      </Combobox.Viewport>
    </Combobox.Content>
  </Combobox.Root>
</template>
