<script setup lang="ts">
import Modal from '@/components/atoms/Modal.vue'
import TriangleSelector from '@/components/elements/TriangleSelector.vue'
import { ref, watch } from 'vue';
import { SUPPORTED_LANGUAGES, i18n, setLanguage } from '@/i18n/i18n-setup'

const lang = ref(i18n.locale)
watch(lang, () => setLanguage(lang.value))
</script>

<template>
  <Modal>
    <template #trigger>
      <div group bg="neutral-0 hover:neutral-200" p-8 mx--8 rounded-full transition-colors>
        <div i-nimiq:gear text="neutral-600 group-hover:neutral-700" transition-colors text-18 />
      </div>
    </template>

    <template #pre-title>
      <div i-nimiq:logos-crypto-map text-26 />
    </template>

    <template #title>
      {{ $t('Crypto Map') }}
    </template>

    <template #description>
      <i18n-t
        class="text-pretty" tag="p"
        keypath="This app is brought to you by Nimiq. It is protected by reCAPTCHA and the Google {privacyPolicy} and {termsOfService} apply."
      >
        <template #privacyPolicy>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" underline text-neutral-800>
            {{ $t('Privacy Policy') }}
          </a>
        </template>
        <template #termsOfService>
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener" underline text-neutral-800>
            {{ $t('Terms of Service') }}
          </a>
        </template>
      </i18n-t>
    </template>

    <template #content>
      <div flex="~ items-center justify-between" mt-32>
        <a href="/location/add" pill-blue pill-sm>
            {{ $t('Add Crypto location') }}
        </a>

        <TriangleSelector :v-model:selected="lang" :options="SUPPORTED_LANGUAGES" />
      </div>
    </template>
  </Modal>
</template>
