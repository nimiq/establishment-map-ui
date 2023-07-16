<script lang="ts">
export const INITIAL_GAP_TO_SCREEN = 20/*px*/ // The gap between the cards to the screen
</script>

<script setup lang="ts">
import BasicEstablishmentInfo from "@/components/elements/BasicEstablishmentInfo.vue";
import CryptoList from "@/components/elements/CryptoList.vue";
import SheetModal from "@/components/elements/SheetModal.vue";
import type { NewEstablishment } from "@/database";
import type { PropType } from 'vue';




defineProps({
  e: {
    type: Object as PropType<NewEstablishment>,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  }
})

defineEmits({
  'update:progress': (_: number) => true,
})
</script>

<template>
  <SheetModal ref="sheetModal" :initial-height="162" :max-height="371" :initial-border-radius="8"
    :initial-gap-to-screen="INITIAL_GAP_TO_SCREEN" class="relative w-full px-6 pb-5 bg-white rounded-t-lg"
    :progress="progress" @update:progress="$emit('update:progress', $event)">
    <BasicEstablishmentInfo :name="e.name" :address="e.address" :gmaps-type="e.gmapsType" :rating="e.rating"
      :url="e.url" />
    <CryptoList :cryptos="e.buy" theme="dark" layout="pill" class="mt-5" />
  </SheetModal>
</template>



