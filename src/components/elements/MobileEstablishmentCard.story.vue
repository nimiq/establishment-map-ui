<script setup lang="ts">
import MobileEstablishmentCard from "./MobileEstablishmentCard.vue";
</script>

<template>
  <Story title="Mobile Card">
    <Variant title="Default">
      <div class="relative h-screen bg-fog">
        <img src="@/assets-dev/stories/map-new-york-square.png" alt="" class="object-cover h-full">
        <div class="absolute bottom-5 left-5 right-5">
          <MobileEstablishmentCard name="Mercedes-Benz Arena" category="entertainment"
            address="Kreuzbergstrasse 28, 10247, Berlin" :buy="['BTC', 'NIM', 'ETH']" gmaps-type="Stadium" :lat="1"
            :lng="1" :rating="4" url="https://goo.gl/maps/ujJkv9DFuPfkwqat9" image="https://shorturl.at/zOQST"
            provider="DEFAULT" />
        </div>
      </div>
    </Variant>
  </Story>
</template>
