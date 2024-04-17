<script setup lang="ts">
defineEmits({ open: Function, close: Function })

const open = defineModel<boolean>()

function hasSlot(slot: 'pre-title' | 'title' | 'description' | 'content') {
  return !!useSlots()[slot]
}
</script>

<template>
  <DialogRoot v-model:open="open" @update:open="$event ? $emit('open') : $emit('close')" group>
    <DialogTrigger v-bind="$attrs">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay bg-darkblue bg-op-60 fixed inset-0 z-20 item-open:animate-fade-in item-closed:animate-fade-out />
      <DialogContent fixed max-desktop="bottom-0 rounded-t-8" desktop="top-1/2 left-1/2 -translate-1/2 rounded-8" max-h-85dvh w-full max-w-512 py-32 rounded-md z-20 of-y-auto ring-neutral-100 shadow-lg bg-neutral-0
        class="data-[state=open]:animate-fade md:rounded-lg md:max-w512"
      >
        <div v-if="hasSlot('pre-title')" px-24 desktop:px-40 mb-16>
          <slot name="pre-title" />
        </div>

        <DialogTitle v-if="hasSlot('title')" px-24 desktop:px-40 mb-8 text-18 font-bold text-neutral lh-none as="h2">
          <slot name="title" />
        </DialogTitle>
        <DialogDescription v-if="hasSlot('description')" as="div" px-24 desktop:px-40 text-neutral-800>
          <slot name="description" />
        </DialogDescription>

        <div v-if="hasSlot('content')" px-24 desktop:px-40>
          <slot name="content" />
        </div>

        <DialogClose :aria-label="$t('Close')" close-btn absolute right-16 top-16 text-28 />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
