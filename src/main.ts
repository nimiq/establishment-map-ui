import '@fontsource/mulish/variable.css'
import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import App from './App.vue'
import { detectLanguage, i18nRegistration, setLanguage } from './i18n/i18n-setup'
import './index.css'

import { router } from './router'

// load and set the initial language
setLanguage(detectLanguage())

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia)
app.use(router)
app.use(i18nRegistration)

// FIXME
// Vue 3 Google Maps is supposed to load the Google Maps API for us, but it doesn't work for some reason
// https://github.com/inocan-group/vue3-google-map/blob/9e33d341d4ba31fdc0dc43acc36989e010b5c996/src/components/GoogleMap.vue#L327-L335
// I tried many things, but this is the only thing that worked
new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY, version: 'weekly' }).importLibrary('places').then(() => {
  app.mount('#app')
})
