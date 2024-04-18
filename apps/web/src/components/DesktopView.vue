<script setup lang="ts">
const { isListShown } = storeToRefs(useApp())
const { singlesInView, clustersInView } = storeToRefs(useMarkers())

const toggleList = useToggle(isListShown)
</script>

<template>
  <TheMapInstance w-screen h-screen />
  <!-- Shadow -->
  <div id="shadow-left" absolute inset-0 max-w-368 pointer-events-none bg-gradient-to-r from-neutral to-transparent />
  <aside absolute max-w-384 inset-24 right-initial h-max pointer-events-none children:pointer-events-auto flex="~ col">
    <!-- This element if for the shadow in the header. We cannot use a normal shadow because the use of mask-image restrict us of using shadows -->
    <div absolute inset-0 shadow pointer-events-none id="shadow"
      style="height: calc(66px + (88px * var(--search-box-hint)))" />
    <div w-max bg-neutral-0 ring-neutral-100 id="wrapper">
      <InteractionBar />
      <DesktopList :singles="singlesInView" :clusters="clustersInView" :list-is-shown="isListShown" />
    </div>
    <button mt-12 pill-tertiary pill-sm ring-neutral-50 z-10 flex="~ gap-8" @click="() => toggleList()">
      <div i-nimiq:chevron-down :class="{ 'rotate-180': isListShown }" text="10 op-70"
        transition="transform delay-500" />
      {{ $t(isListShown ? 'Hide list' : 'Show list') }}
    </button>
  </aside>
  <!-- <FilterModal v-if="maxZoomFromServer < zoom" absolute top-24 right-24 /> -->
  <Controls absolute bottom-24 right-24 />
</template>

<style scoped>
#shadow-left {
  will-change: transform;

  /* List or suggestions closed */
  transform: translateX(-100%);
  transition: transform 1000ms 75ms, opacity 300ms 75ms;
  opacity: 0;

  &:has(+ aside [data-state="open"]) {
    /* List or suggestions opened */
    transform: translateX(0);
    transition: transform 500ms 100ms, opacity 300ms 100ms;
    opacity: 0.2;
  }
}

aside {
  #shadow {
    border-radius: 16px;
    transition: border-radius 75ms;

    &:has(+ #wrapper [data-suggestions]) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  #wrapper {
    transition: border-radius 75ms;
    border-radius: 16px;
    box-shadow: 0px 0.337px 2px 0px rgba(0, 0, 0, 0.03), 0px 1.5px 3px 0px rgba(0, 0, 0, 0.05), 0px 4px 16px 0px rgba(0, 0, 0, 0.07);

    &:not(:has([data-suggestions])) {
      mask-image: linear-gradient(white, white);
    }

    /*
  If the list is closed and there are suggestions, we need to remove the border-radius.
  We use double :has to make an AND gate
  in other words: If we have suggestions AND the list is closed.
  */
    &:has([data-suggestions]):has([data-state="open"]) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
