<script setup lang="ts">
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <component :is="route.meta.transition ? 'transition' : 'div'" :name="route.meta.transition ? route.meta.transition : ''">
      <template v-if="typeof route.name === 'string' && ['coords', 'map'].includes(route.name)">
        <h1 class="sr-only">
          {{ $t('Explore the Crypto Map') }}
        </h1>
      </template>
      <component :is="Component" />
    </component>
  </RouterView>
</template>

<style scoped>
.slide-left-leave-active,
.slide-left-enter-active {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.25, 0, 0, 1);
  transition-duration: 400ms;
}

.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-left-leave-to {
  transform: translate(-100%, 0);
}

.slide-right-leave-active,
.slide-right-enter-active {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.25, 0, 0, 1);
  transition-duration: 400ms;
}

.slide-right-enter {
  transform: translate(-100%, 0);
}

.slide-right-leave-to {
  transform: translate(200%, 0);
}
</style>
