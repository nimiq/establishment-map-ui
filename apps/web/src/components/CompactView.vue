<script setup lang="ts">
const searchOpen = ref(false)
</script>

<template>
  <div flex="~ col" h="screen 100dvh">
    <TheMapInstance flex-1 />

    <div absolute right-24 bottom-24>
      <button size-32 rounded-full bg="neutral-0 hover:neutral-100" transition-colors grid="~ place-content-center"
        :aria-label="$t('Search')" :title="$t('Search')" @click="searchOpen = true">
        <div i-nimiq:magnifying-glass />
      </button>
    </div>
    <div absolute z-10>

    </div>
    <MobileSearch v-model:open="searchOpen" fixed inset-0 bg-neutral-0 />
  </div>
</template>
