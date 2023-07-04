import type { BaseEstablishment, Establishment } from "@/database";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useApp } from "./app";
import { useMap, type BoundingBox } from "./map";

export const useEstablishments = defineStore("establishments", () => {
  const appStore = useApp();
  const { selectedCategories, selectedCurrencies } = storeToRefs(appStore);

  const mapStore = useMap();
  const { boundingBox } = storeToRefs(mapStore);

  const establishments = ref(new Map<string, BaseEstablishment | Establishment>());

  function isInsideBoundingBox(establishment: BaseEstablishment | Establishment, { northEast, southWest }: BoundingBox) {
    const lat = establishment.lat;
    const lng = establishment.lng;
    return lat <= northEast.lat && lat >= southWest.lat && lng <= northEast.lng && lng >= southWest.lng;
  }

  function isFilteredByCurrencies(establishment: BaseEstablishment | Establishment) {
    if (selectedCurrencies.value.length === 0) return true;
    const buys = establishment.providers.map(p => p.buy).reduce((a, b) => a.concat(b), []);
    const sells = establishment.providers.map(p => p.sell).reduce((a, b) => a.concat(b), []);
    const currencies = new Set(buys.concat(sells));

    for (const currency of selectedCurrencies.value) {
      if (currencies.has(currency.symbol)) return true;
    }

    return false;
  }

  function isFilteredByCategories(establishment: BaseEstablishment | Establishment) {
    if (selectedCategories.value.length === 0) return true;
    return selectedCategories.value.map(c => c.label).includes(establishment.category);
  }

  function includeEstablishment(establishment: BaseEstablishment | Establishment, boundingBox: BoundingBox) {
    return isInsideBoundingBox(establishment, boundingBox) && isFilteredByCurrencies(establishment) && isFilteredByCategories(establishment);
  }

  const establishmentsInView = computed(() => Array.from(establishments.value.values()).filter(e => includeEstablishment(e, boundingBox.value)));

  return {
    establishments,
    establishmentsInView,
  }
});
