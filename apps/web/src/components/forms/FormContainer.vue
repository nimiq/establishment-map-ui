<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref, useSlots } from 'vue'
import Button from '@/components/atoms/Button.vue'
import ArrowLinkIcon from '@/components/icons/icon-arrow-link.vue'
import { useCaptcha } from '@/composables/useCaptcha'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  onSubmit: {
    type: Function as PropType<(token: string) => Promise<Response | undefined>>,
    required: true,
  },
  showForm: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['submit'])

enum FormState {
  Initial = 'initial',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const state = ref<FormState>(FormState.Initial)
const disabled = computed(
  () => [FormState.Loading, FormState.Success].includes(state.value) || props.disabled,
)

async function onSubmit() {
  if (disabled.value)
    return

  state.value = FormState.Loading
  const captcha = await useCaptcha().getCaptchaToken()
  const res = await props.onSubmit(captcha)
  state.value = res?.ok ? FormState.Success : FormState.Error
}

const slots = useSlots()
function hasSlot(name: string) {
  return !!slots[name]
}
</script>

<template>
  <header class="flex items-center p6 shadow-header gap-x-4">
    <img src="@/assets/logo.svg" :alt="$t('Crypto Map logo')" class="h6">
    <button pill-secondary href="/" arrow-back>{{ $t('Back to the Map') }}</button>
  </header>
  <div class="w-clamp(-[284px] w-[768px] w-calc(100vw-3rem))">
    <transition mode="out-in" enter-active-class="transition duration-500 ease-out lg:duration-100" :enter-from-class="`opacity-0 ${state === FormState.Initial ? '-translate-x-12' : 'translate-x-12'
      }`" enter-to-class="translate-x-0 opacity-100" leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100" :leave-to-class="`opacity-0 ${state === FormState.Initial ? 'translate-x-12' : '-translate-x-12'
        }`">
      <main v-if="[FormState.Initial, FormState.Loading].includes(state)">
        <h1 v-if="hasSlot('title')" class="font-bold text-4xl lg:text-5xl text-space leading-[1.2]">
          <slot name="title" />
        </h1>
        <p v-if="hasSlot('description')" class="mt6 font-semibold text-space/60 lg:mt8">
          <slot name="description" />
        </p>

        <div v-if="hasSlot('link')"
          class="text-sky font-bold text-14 group flex justify-center items-center gap-x-1.5 mt4">
          <slot name="link" />
          <ArrowLinkIcon class="w2.5 h2.5 group-hover:left-0.5 group-hover:-top-0.5 transition-all duration-300" />
        </div>

        <form v-if="hasSlot('form')" class="transition-opacity transition-transform"
          :class="showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'" @submit.prevent="onSubmit">
          <slot name="form" />

          <button pill-blue :class="{ loading: state === FormState.Loading }" :disabled="disabled" mt-40>
            {{ $t('Send') }}
          </button>
        </form>
      </main>

      <main v-else-if="state === FormState.Success">
        <h1 v-if="hasSlot('success-title')" class="font-bold text-4xl lg:text-5xl text-space leading-[1.2]">
          <slot name="success-title" />
        </h1>
        <p v-if="hasSlot('success-description')" class="mt6 font-semibold text-space/60 lg:mt8">
          <slot name="success-description" />
        </p>
        <button pill-blue mt-40 v-if="hasSlot('success-button-label')" href="/">
          <slot name="success-button-label"></slot>
        </button>
      </main>

      <main v-else-if="state === FormState.Error">
        <h1 v-if="hasSlot('error-title')" class="font-bold text-4xl lg:text-5xl text-space leading-[1.2]">
          <slot name="error-title" />
        </h1>
        <p v-if="hasSlot('error-description')" class="mt6 font-semibold text-space/60 lg:mt8">
          <slot name="error-description" />
        </p>
        <button pill-blue mt-40 v-if="hasSlot('error-button-label')" @click="state = FormState.Initial">
          <slot name="success-button-label" />
        </button>
      </main>
    </transition>
  </div>
</template>
