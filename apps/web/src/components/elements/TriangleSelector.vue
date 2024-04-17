<script setup lang="ts">
import { Select } from 'radix-vue/namespaced'
import { computed } from 'vue';

const props = defineProps<{ options: string[] }>()
const selected = defineModel<string>('selected')
const options = computed(() => props.options.filter(option => option !== selected.value).concat(selected.value!))
</script>

<template>
  <Select.Root v-model="selected">
    <Select.Trigger px-12 py-4 group outline-none focus-visible:outline-blue rounded-4>
      <Select.Value flex="~ items-center gap-8" label text="14 neutral" as="div" />
    </Select.Trigger>
    <Select.Portal>
      <Select.Content bg-gradient-neutral text-neutral-0 shadow rounded-6 bottom-0 drop-shadow relative side="bottom" position="item-aligned" py-6>
        <Select.Viewport>
          <Select.Item v-for="option in options" :key="option" :value="option" px-12 py-4 cursor-pointer group  outline="none hover:none focus-visible:blue">
            <Select.ItemText label text="14 neutral-600/80 group-hover:neutral-0" transition-colors flex="~ items-center gap-8">
              {{ option }}
              <div aria-hidden i-nimiq:triangle-left text="7 neutral-50 item-closed:neutral-800" item-closed:rotate--90 duration="[opacity_100ms] [transform_400ms]" transition op-0 group-hover="scale-115 op-100 rotate-0" item-closed:op-100 />
            </Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
</template>
