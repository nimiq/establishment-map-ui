<script setup lang="ts">
import type { PropType } from 'vue';
import BasicEstablishmentInfo from "@/components/elements/BasicEstablishmentInfo.vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gmapsType: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  buy: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  sell: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
})
</script>

<template>
  <article class="px-6 pb-5 bg-white rounded-lg shadow">
    <div class="pt-2 pb-[21px]">
      <hr class="bg-black h-[5px] rounded-full w-32 mx-auto border-0">
    </div>
    <BasicEstablishmentInfo :name="name" :address="address" :gmaps-type="gmapsType" :rating="rating" :url="url" />
  </article>
</template>
