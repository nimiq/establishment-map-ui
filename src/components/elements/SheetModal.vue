<script setup lang="ts">
import { computed, ref } from 'vue';

const INITIAL_GAP = 20/*px*/

const props = defineProps({
  initialHeight: {
    type: Number,
    required: true,
  },
  maxHeight: {
    type: Number,
    required: true,
  },
})

const progress = ref(0)
const dif = props.maxHeight - props.initialHeight

let initialY = 0
let initialTime = 0
let dragging = false
let isOpen = false
const container = ref<HTMLElement | null>(null)

function onStart(event: PointerEvent) {
  dragging = true
  initialTime = event.timeStamp
  initialY = event.clientY
  isOpen = progress.value === 1
  container.value!.setPointerCapture(event.pointerId)
}

function onMove(event: PointerEvent) {
  if (!dragging) return
  const yDelta = (initialY - event.clientY)
  const startingPoint = isOpen ? yDelta + dif : yDelta
  progress.value = Math.max(0, Math.min(startingPoint / dif, 1))
}

function onEnd(event: PointerEvent) {
  dragging = false
  container.value!.releasePointerCapture(event.pointerId)

  animateShortly()
  const isTouch = event.pointerType === "touch"
  const timeDelta = event.timeStamp - initialTime

  const isClick = isTouch
    ? timeDelta < 100
    : timeDelta < 250

  if (isClick && !isOpen) {
    open()
  } else {
    if (isOpen) {
      progress.value < 0.85 ? close() : open()
    } else {
      progress.value > 0.15 ? open() : close()
    }
  }
}

const style = computed(() => {
  const gap = (1 - progress.value) * INITIAL_GAP
  const borderRadius = (1 - progress.value) * 0.5
  const height = props.initialHeight + dif * progress.value

  return {
    top: `${window.innerHeight - height - gap}px`,
    left: `${gap}px`,
    right: `${gap}px`,
    borderBottomRightRadius: `${borderRadius}rem`,
    borderBottomLeftRadius: `${borderRadius}rem`,
    height: `${height}px`,
  }
})

function close() {
  progress.value = 0
}

function open() {
  progress.value = 1
}

function animateShortly() {
  container.value?.style.setProperty('--duration', '0.1s')
  setTimeout(() => container.value?.style.removeProperty('--duration'), 100)
}
</script>

<template>
  <div ref="container" class="absolute sheet-transition touch-none" :style="style" @pointerdown.prevent="onStart"
    @pointermove.prevent="onMove" @pointerup.prevent="onEnd">
    <div class="pt-2 pb-5 cursor-grab">
      <hr class="w-32 h-1 mx-auto border-0 rounded-full bg-black/20">
    </div>
    {{ progress }}
    <slot />
  </div>
</template>

<style>
.sheet-transition {
  transition: top var(--duration), left var(--duration), right var(--duration), border-bottom-right-radius var(--duration), border-bottom-left-radius var(--duration), height var(--duration);
}
</style>
