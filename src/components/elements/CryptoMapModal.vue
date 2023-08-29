<script setup lang="ts">
import Modal from '@/components/atoms/Modal.vue'
import Button from '@/components/atoms/Button.vue'
import LanguageSelector from '@/components/elements/LanguageSelector.vue'
import CryptoMapIcon from '@/components/icons/icon-crypto-map.vue'
import GearIcon from '@/components/icons/icon-gear.vue'

import { SUPPORTED_LANGUAGES, i18n, setLanguage } from '@/i18n/i18n-setup'

function _onLanguagesChange(language: string) {
  setLanguage(language)
}
</script>

<template>
  <Modal>
    <template #trigger="{ openModal }">
      <Button bg-color="transparent" size="md" @click="openModal">
        <template #icon>
          <GearIcon class="text-space/30 w-4.5 h-4.5" />
        </template>
      </Button>
    </template>

    <template #pre-title>
      <CryptoMapIcon class="h-8" />
    </template>

    <template #title>
      {{ $t('Crypto Map') }}
    </template>

    <template #content>
      <p class="[text-wrap:pretty]">
        {{
          $t('This app is brought to you by Nimiq, only places that are verified by Google are accepted for this map.')
        }}
      </p>

      <div class="flex items-center justify-between mt-8">
        <Button bg="sky" href="/location/add">
          <template #label>
            {{ $t('Add Crypto location') }}
          </template>
        </Button>

        <LanguageSelector :value="i18n.locale" :languages="SUPPORTED_LANGUAGES" @update:language="_onLanguagesChange" />
      </div>
    </template>
  </Modal>
</template>
