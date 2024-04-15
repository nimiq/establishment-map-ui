<script setup lang="ts">
import { useClipboard, useShare } from '@vueuse/core'
import { DropdownMenu } from 'radix-vue/namespaced'
import type { Location } from 'types'
import { i18n } from '@/i18n/i18n-setup'

const props = defineProps<{ location: Location }>()

const { share, isSupported: shareIsSupported } = useShare()
const { copy, isSupported: copyIsSupported } = useClipboard()

const url = () => `${window.location.origin}${window.location.pathname}?uuid=${props.location.uuid}`

const options = [
  {
    icon: 'i-nimiq:nodes',
    text: i18n.t('Share'),
    action: () => share({
      title: props.location.name,
      text: i18n.t('Check out {locationName} on Nimiq\'s Crypto Map', { locationName: props.location.name }),
      url: url(),
    }),
    if: shareIsSupported,
  },
  {
    icon: 'i-nimiq:copy',
    text: i18n.t('Copy URL'),
    action: () => copy(url()),
    if: copyIsSupported,
  },
].filter(option => option.if)
</script>

<template>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger v-bind="$attrs">
      <div i-nimiq:vector text="20 neutral-600 hocus:neutral-700" transition-colors />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content bg-gradient-neutral rounded-6 p-4 will-change-colors shadow absolute top--24 right--10 animate-in fade-in slide-in-r-4 duration-150
        min-w-max flex="~ col" :side-offset="0">
        <DropdownMenu.Item v-for="({ action, text, icon }) in options" :key="text" flex="~ items-center" px-16 py-8 bg="hocus:neutral-0/10" rounded-6
          text="neutral-0 hover:text-neutral-100" select-none cursor-pointer @click="action">
          <div :class="icon" text-16 mr-12 />
          <span text-16 font-semibold>{{ text }}</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item as="a" :href="`/location/report?uuid=${location.uuid}`" flex="~ items-center" px-16 py-8
          text-red select-none cursor-pointer bg="hocus:red/20" rounded-6>
          <div i-nimiq:flag text-16 mr-12 />
          <span text-16 font-semibold>{{ $t('Report') }}</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
</template>
