import type { Category, Currency } from '@/database';
import { useRouteQuery } from '@vueuse/router';
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useApi } from "./api";
import { useMap } from "./map";

export const useApp = defineStore("app", () => {
  const apiStore = useApi();
  const { categories, currencies } = storeToRefs(apiStore);

  const listIsShown = ref(false);
  const toggleList = () => listIsShown.value = !listIsShown.value;
  const showList = () => listIsShown.value = true;
  const hideList = () => listIsShown.value = false;

  const mapGestureBehaviour = ref(useRouteQuery('gestureBehaviour') || 'greedy');

  const selectedEstablishmentUuid = useRouteQuery('e')
  const selectedCategoriesQuery = useRouteQuery('categories')
  const selectedCategories = computed(() => {
    const c = selectedCategoriesQuery.value
    if (!c) return []
    const categoriesArray = Array.isArray(c) ? c : [c]
    return (categoriesArray.map((currency: string) => categories.value?.get(currency)).filter(Boolean) || []) as Category[];
  })
  const selectedCurrenciesQuery = useRouteQuery('currencies')
  const selectedCurrencies = computed(() => {
    const c = selectedCurrenciesQuery.value
    if (!c) return []
    const currenciesArray = Array.isArray(c) ? c : [c]
    return (currenciesArray.map((currency: string) => currencies.value?.get(currency)).filter(Boolean) || []) as Currency[];
  })

  function setSelectedCurrencies(currencies: string[]) {
    selectedCurrenciesQuery.value = currencies
  }

  function setSelectedCategories(categories: string[]) {
    selectedCategoriesQuery.value = categories
  }

  const mapStore = useMap();
  const { computeBoundingBox } = mapStore;

  const { setCenter, setZoom } = useMap();

  async function goToEstablishment(uuid: string, options?: { behaviourList?: 'show' | 'hide' }) {
    const establishment = await useApi().getEstablishmentByUuid(uuid).catch(/** Handle error(?) */)
    if (!establishment) return false

    setCenter({ lng: establishment.lng, lat: establishment.lat })
    setZoom(19)
    selectedEstablishmentUuid.value = uuid
    if (options?.behaviourList === 'show') showList()
    if (options?.behaviourList === 'hide') hideList()
    computeBoundingBox({ updateRoute: false })
    return true
  }

  return {
    listIsShown,
    toggleList,
    showList,
    hideList,
    selectedEstablishmentUuid,
    goToEstablishment,
    selectedCategories,
    selectedCurrencies,
    mapGestureBehaviour,
    setSelectedCurrencies,
    setSelectedCategories,
  }
});
