<script setup lang="ts">
import Button from '@/components/elements/Button.vue';
import CryptoList from "@/components/elements/CryptoList.vue";
import FlagIcon from "@/components/icons/icon-flag.vue";
import IconGmapsPin from '@/components/icons/icon-gmaps-pin.vue';
import StarFilledIcon from "@/components/icons/icon-star-filled.vue";
import StarIcon from "@/components/icons/icon-star.vue";
import type { BaseEstablishment, Establishment } from '@/stores/establishments';
import { computed, defineAsyncComponent } from 'vue';

const GoCryptoIcon = defineAsyncComponent(
  () => import("@/components/icons/providers/gocrypto.vue")
)

const InfoIcon = defineAsyncComponent(
  () => import("@/components/icons/icon-info.vue")
)

const Popover = defineAsyncComponent(
  () => import("@/components/elements/Popover.vue")
)

const props = defineProps<{
  establishment: Establishment | BaseEstablishment
}>()

const gmapsCategory = computed(() => {
  if (!props.establishment.hasAllInfo) return ''
  return props.establishment.gmapsTypes.length > 0 ? props.establishment.gmapsTypes[0] : props.establishment.category
})

const body = document.querySelector('body')!;

/**
 * For now we only support in the UI establishments that have only a provider
 */
const provider = computed(() => props.establishment.hasAllInfo && props.establishment.providers.length ? props.establishment.providers[0] : undefined)
const isDefaultProvider = computed(() => provider.value?.name === 'DEFAULT')
</script>

<template>
  <div class="pb-6 bg-white rounded-lg shadow-lg">
    <div class="grid grid-cols-1 grid-rows-1 p-1.5 pb-0 relative">
      <template v-if="establishment.hasAllInfo">
        <img :src="establishment.photoUrl" class="w-full aspect-[1.77] rounded-md object-cover" :alt="establishment.name"
          loading="lazy">
        <Button :href="establishment.gmapsUrl" bg-color="white"
          class="absolute top-3.5 right-3.5 [&_[data-icon]>svg]:w-3 [&_[data-icon]>svg]:h-3" layout="label-icon">
          <template #label>
            <IconGmapsPin />
          </template>
        </Button>
      </template>
      <div v-else class="w-full aspect-[1.77] bg-space/[0.15] rounded-md animate-pulse" />
    </div>

    <div class="px-6 pt-5">
      <div class="grid justify-between grid-cols-[1fr,auto] gap-x-2">
        <h2 class="text-base font-bold leading-[1.3]">{{ establishment.name }}</h2>
        <Button :href="`/establishment/${establishment.uuid}/report`" bg-color="white" hide-icon
          class="!w-7 !h-7 ring-1 ring-space/10 row-span-2" v-if="establishment.hasAllInfo">
          <template #label>
            <FlagIcon class="mx-auto text-space w-3.5" />
          </template>
        </Button>
        <div v-if="establishment.hasAllInfo" class="flex gap-x-1.5 items-baseline mt-1 grid-cols-1">
          <span class="text-xs font-semibold capitalize text-space/70">{{ gmapsCategory }}</span>
          <div class="flex gap-x-0.5" v-if="typeof establishment.rating === 'number'">
            <template v-for="i in 5" :key="i">
              <component class="w-3 h-3" :is="i <= establishment.rating ? StarFilledIcon : StarIcon" />
            </template>
          </div>
        </div>
        <p class="text-xs leading-[1.5] text-space/70 grid-cols-1 col-span-2" v-if="establishment.hasAllInfo">
          {{ establishment.address }}
        </p>
        <div v-else class="text-xs leading-[1.5] text-space/70 grid-cols-1 col-span-2">
          Loading...
        </div>
      </div>

      <div class="relative z-10 flex mt-6 gap-x-3" v-if="establishment.hasAllInfo">
        <CryptoList v-if="provider" layout="pill" theme="light" :cryptos="provider.buy"
          :label="provider.sell?.length > 0 ? $t('Buy') : undefined" :max="provider.sell?.length > 0 ? 3 : 6" />
        <CryptoList v-if="provider && provider.sell?.length > 0" layout="pill" theme="light" :cryptos="provider.sell"
          :label="$t('Sell')" :max="3" />
      </div>

      <template v-if="provider && ['Kurant', 'GoCrypto'].includes(provider?.name)">
        <!-- <div class="relative -mx-6 -mb-6 rounded-b-md" -->
        <div class="relative -mx-6 -mb-6 rounded-b-md"
          :class="{ 'bg-[#F0BF4C]': provider.name === 'GoCrypto', 'bg-[#A92E19]': provider.name === 'Kurant' }">
          <hr class="absolute top-0 w-full h-px bg-space/10" />
          <hr class="absolute w-full h-px -top-px bg-space/10" />
          <div
            class="absolute inset-0 bg-[radial-gradient(100%_75.78%_at_100%_0%,_#ffffff_0%,_rgba(255,_255,_255,_0)_100%)] opacity-30 pointer-events-none">
          </div>
          <div class="pl-6 pr-4 mt-[-15px] z-20">
            <div class="pt-[26px] pb-4 text-xs flex gap-x-2 items-center">
              <p v-if="provider.name === 'GoCrypto'" v-html="$t('providers.gocrypto.entry')" />
              <p v-if="provider.name === 'Kurant'" class="text-white" v-html="$t('providers.kurant.entry')" />
              <Popover :container="body">
                <template #trigger>
                  <InfoIcon
                    :class="{ 'text-white/50': provider.name === 'Kurant', 'text-space/50': provider.name === 'GoCrypto' }" />
                </template>
                <template #title>
                  {{ provider.name }}
                </template>
                <template #description>
                  <template v-if="provider.name === 'GoCrypto'">{{ $t('providers.gocrypto.tooltip') }}</template>
                  <template v-if="provider.name === 'Kurant'">{{ $t('providers.kurant.tooltip') }}</template>
                </template>
                <template #post-description>
                  <div class="!my-3">
                    <CryptoList v-if="provider" :cryptos="provider.buy" layout="dots" theme="dark"
                      :label="provider.sell?.length > 0 ? $t('Buy') : undefined"
                      :max="provider.sell?.length > 0 ? 3 : 6" />
                    <CryptoList v-if="provider && provider.sell?.length > 0" layout="dots" theme="dark"
                      :cryptos="provider.sell" :label="$t('Sell')" :max="3" class="mt-3" />
                  </div>
                </template>
                <template #cta>
                  {{ $t('Register') }}
                </template>
              </Popover>
            </div>
          </div>
          <div
            class="absolute inset-0 overflow-hidden pointer-events-none bg-[url(@/assets/provider-rings-background.svg)] bg-no-repeat bg-[calc(100%+67px)_-75px]">
            <div class="relative py-3">
              <GoCryptoIcon class="ml-auto mr-5 text-space"
                style="0px 12.8571px 27.1429px rgba(31, 35, 72, 0.07), 0px 5px 6.07143px rgba(31, 35, 72, 0.04), 0px 1.42857px 1.78571px rgba(31, 35, 72, 0.02);" />
            </div>
          </div>
        </div>
      </template>
      <!-- TODO Loading crypto component -->
    </div>
  </div>
  <!-- class="shadow-lg border pt-1.5 pb-6 rounded-lg flex flex-col break-inside-avoid-column transition-[box-shadow]" -->
</template>
