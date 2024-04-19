<script setup lang="ts">
const open = defineModel<boolean>('open')
const slots = useSlots()
</script>

<template>
  <DialogRoot v-model:open="open" group>
    <DialogTrigger v-bind="$attrs">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <Transition name="nested">
        <DialogContent fixed bottom-0 desktop="top-1/2 left-1/2 translate--1/2" z-100 h-max max-h-85dvh w-512
          max-w-full py-32 rounded-md z-20 of-y-auto ring="1.5 neutral-50" shadow-lg bg-neutral-0 data-nested
          rounded="t-8 desktop:8">

          <DialogTitle v-if="slots.title" px-24 desktop:px-40 mb-8 text-18 font-bold text-neutral lh-none as="h2">
            <slot name="title" />
          </DialogTitle>
          <DialogDescription v-if="slots.description" as="div" px-24 desktop:px-40 text-neutral-800>
            <slot name="description" />
          </DialogDescription>

          <div v-if="slots.content" px-24 desktop:px-40>
            <slot name="content" />
          </div>

          <DialogClose :aria-label="$t('Close')" close-btn absolute right-16 top-16 text-28 />
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
/* https://github.com/nimiq/wallet/blob/master/src/components/modals/Modal.vue */

.nested-enter-active {
  transition: transform 650ms cubic-bezier(.3, 1, 0.2, 1);
}

.nested-leave-active {
  transition: transform 450ms cubic-bezier(0.3, 0, 0, 1);
}

.nested-enter-from,
.nested-leave-to {
  /**
     * 100% is the height of the nested
     * 100vh is the height of the viewport
     *
     * To adapt the animation distance to the screen height (because we don't want the nested to only
     * animate part of the way on larger screens, or ultra-fast on smaller screens), we calculate the
     * distance between the top of the nested to the top of the viewport [(100vh - 100%) / 2] and add
     * the height of the nested to it [+ 100%]. Then we just turn it around into a negative distance
     * [-1 *] so it animates from and to the top, and we add a little extra [1.1 = +10%] so the easing
     * doesn't stop at the top of the viewport.
     */
  /* transform: translate3D(0, calc(-1.1 * ((100vh - 100%) / 2 - 50%)), 0); */
  --un-translate-y: calc(-1.1 * (100vh / 2) - 100%);

  @media (max-width: 700px) {
    /* transform: translate3D(0, 100%, 0); */
  }
}
</style>
