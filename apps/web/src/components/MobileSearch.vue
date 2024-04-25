<script setup lang="ts">
const autocomplete = Object.values(Autocomplete)
const { query, status, googleSuggestions, locationSuggestions } = useAutocomplete({ autocomplete })
const open = defineModel<boolean>('open')
open.value = query.value !== ''

// See https://github.com/radix-vue/radix-vue/issues/877
watch(query, (newQuery, oldQuery) => {
  if (!!oldQuery && newQuery === '')
    query.value = oldQuery
}, { once: true })

function reset() {
  if (query.value === '') return
  query.value = ''
  open.value = false
}
</script>

<template>
  <Transition name="fade">
    <ComboboxRoot v-if="open" v-model:searchTerm="query" @update:model-value="reset">
      <ComboboxAnchor flex="~ items-center justify-between" relative group border-b="1.5 neutral-500 focus-within:blue">
        <ComboboxInput :placeholder="$t('Search Map')" order-2 auto-focus font-semibold input-box rounded-0 outline-none
          shadow-none text-14 w-full py-16 pr-48 />
        <ComboboxTrigger @click="open = false" :aria-label="$t('Go back')" arrow-back pl-16
          text="16  neutral-700 group-focus-within:blue/80" />
        <ComboboxCancel i-nimiq:cross absolute right-24 op-0 :class="query === '' ? 'op-0' : 'op-100'"
          transition-opacity delay-500 text="10  neutral-700 group-focus-within:blue/80" />
      </ComboboxAnchor>
      <SearchSuggestions :status :googleSuggestions :locationSuggestions top-55 mt-16 />
    </ComboboxRoot>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms var(--nq-ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
