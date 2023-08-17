import '@fontsource/mulish/variable.css'
import { Loader } from '@googlemaps/js-api-loader'
import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'
import App from './App.vue'
import './index.css'
import { detectLanguage, i18nRegistration, setLanguage } from './i18n/i18n-setup'

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

new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY, version: 'weekly' }).importLibrary('places').then(() => {
  app.mount('#app')
})
