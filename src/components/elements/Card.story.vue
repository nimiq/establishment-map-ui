<script setup lang="ts">
import { ProviderName, type Location } from "@/database";
import Card, { CardLayout } from "./Card.vue";
import { computed, ref } from "vue";

const progressState = ref<"expanded" | "not-expanded" | "loop" | "custom">("expanded")
const customProgress = ref(0)

const intervalValue = ref(0)
setInterval(() => {
  if (progressState.value !== "loop") return
  intervalValue.value = (intervalValue.value + 0.01) % 1.2
}, 1)

const progress = computed(() => {
  if (progressState.value === "expanded") return 1
  if (progressState.value === "not-expanded") return 0
  return intervalValue.value % 1
})

const locations: Location[] = [{
  uuid: "1",
  name: "Mercedes-Benz Arena",
  category: "entertainment",
  address: "Kreuzbergstrasse 28, 10247, Berlin",
  buy: ['BTC', 'NIM', 'ETH'],
  sell: [],
  gmapsType: "Stadium",
  lat: 1,
  lng: 1,
  rating: 4,
  url: "https://goo.gl/maps/ujJkv9DFuPfkwqat9",
  image: "https://images.unsplash.com/photo-1646491946169-76e0668b8b3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  provider: ProviderName.Default
}, {
  uuid: "2",
  name: "ATM",
  category: "cash",
  address: "Kreuzbergstrasse 28, 10247, Berlin",
  buy: ['BTC', 'NIM', 'ETH', 'Dash', 'XRP'],
  sell: [],
  gmapsType: "Bank",
  lat: 1,
  lng: 1,
  rating: 4,
  url: "https://goo.gl/maps/ujJkv9DFuPfkwqat9",
  provider: ProviderName.DefaultAtm,
}, {
  uuid: "2",
  name: "ATM (Kurant)",
  category: "cash",
  address: "Kreuzbergstrasse 28, 10247, Berlin",
  buy: ['BTC', 'NIM'],
  sell: ['NIM'],
  gmapsType: "Bank",
  lat: 1,
  lng: 1,
  rating: 4,
  url: "https://goo.gl/maps/ujJkv9DFuPfkwqat9",
  provider: ProviderName.Kurant,
}, {
  uuid: "3",
  name: "Room 88",
  category: "entertainment",
  address: "Kreuzbergstrasse 28, 10247, Berlin",
  buy: ['BTC', 'NIM', 'ETH'],
  sell: [],
  gmapsType: "Stadium",
  lat: 1,
  lng: 1,
  rating: 4,
  url: "https://goo.gl/maps/ujJkv9DFuPfkwqat9",
  image: "https://images.unsplash.com/photo-1543007631-283050bb3e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  provider: ProviderName.Bluecode
}, {
  uuid: "4",
  name: "Mercedes-Benz Arena",
  category: "entertainment",
  address: "Kreuzbergstrasse 28, 10247, Berlin",
  buy: ['BTC', 'NIM', 'ETH'],
  sell: [],
  gmapsType: "Stadium",
  lat: 1,
  lng: 1,
  rating: 4,
  url: "https://goo.gl/maps/ujJkv9DFuPfkwqat9",
  image: "https://images.unsplash.com/photo-1646491946169-76e0668b8b3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  provider: ProviderName.GoCrypto
}, {
  uuid: "5",
  name: "Mercedes-Benz Arena",
  category: "entertainment",
  address: "Kreuzbergstrasse 28, 10247, Berlin",
  buy: ['BTC', 'NIM', 'USDC'],
  sell: [],
  gmapsType: "Stadium",
  lat: 1,
  lng: 1,
  rating: 4,
  url: "https://goo.gl/maps/ujJkv9DFuPfkwqat9",
  image: "https://images.unsplash.com/photo-1646491946169-76e0668b8b3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  provider: ProviderName.CryptopaymentLink
}, {
  uuid: "5",
  name: "Mercedes-Benz Arena",
  category: "cash",
  address: "Kreuzbergstrasse 28, 10247, Berlin",
  buy: ['BTC', 'NIM', 'USDC'],
  sell: [],
  gmapsType: "Stadium",
  lat: 1,
  lng: 1,
  rating: 4,
  url: "https://goo.gl/maps/ujJkv9DFuPfkwqat9",
  provider: ProviderName.Edenia
}]

const layout = ({ category }: Location) => category === 'cash' ? CardLayout.Atm : CardLayout.Location;
</script>

<template>
  <Story title="Location card" :layout="{ type: 'grid', width: '300px' }">
    <template #controls>
      <div class="flex flex-col px-4 py-4 gap-x-2">
        <label for="expanded" class="select-none">Progress State</label>
        <select v-model="progressState" class="text-black bg-transparent bg-snow">
          <option name="expanded" value="expanded" class="text-black">Expanded</option>
          <option name="not-expanded" value="not-expanded" class="text-black">Not expanded</option>
          <option name="loop" value="loop" class="text-black">Loop</option>
          <option name="custom" value="custom" class="text-black">Custom</option>
        </select>
      </div>

      <div class="flex flex-col px-4 py-4 gap-x-2" v-if="progressState === 'custom'">
        <label for="expanded">Custom Progress</label>
        <input name="customProgress" id="customProgress" class="text-black" type="number" v-model="customProgress">
      </div>
    </template>

    <Variant v-for="(l, i) in locations" :title="l.provider" :key="i" class="flex items-end h-full">
      <Card :location="l" :progress="progressState === 'custom' ? customProgress : progress" :layout="layout(l)"
        class="relative" />
    </Variant>

  </Story>
</template>
