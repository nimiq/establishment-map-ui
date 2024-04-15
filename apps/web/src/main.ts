import '@fontsource/mulish/latin-400.css'
import '@fontsource/mulish/latin-600.css'
import '@fontsource/mulish/latin-700.css'
import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'
import App from './App.vue'
import { detectLanguage, i18nRegistration, setLanguage } from './i18n/i18n-setup'
import './index.css'
import 'virtual:uno.css'

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

app.mount('#app')
