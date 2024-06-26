import { DynamicScroller } from 'vue-virtual-scroller'

export default defineNuxtPlugin({
  name: 'vue-scroller',
  setup: ({vueApp}) => {
    vueApp.component('DynamicScroller', DynamicScroller)
  }
})
