import "@fontsource/mulish/variable.css";
import { Loader } from "@googlemaps/js-api-loader";
import { createPinia } from "pinia";
import { createApp, markRaw } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import "./index.css";
import { messages } from "./i18n";

import { router } from "./router";

const languageUser = navigator.language;
export const i18n = createI18n<false>({
  locale: languageUser,
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router)
});
app.use(pinia);
app.use(router);
app.use(i18n);

new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY, version: "weekly", libraries: ['places'] }).load().then(() => {
  app.mount("#app");
});

export default {}
