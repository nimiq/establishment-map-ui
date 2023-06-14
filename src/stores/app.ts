import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "./api";
import { useMap } from "./map";

export enum AutocompleteStatus {
  LOADING = "loading",
  WITH_RESULTS = "with-results",
  NO_RESULTS = "no-results",
  ERROR = "error",
}

export const useApp = defineStore("app", () => {
  const listIsShown = ref(false);
  const toggleList = () => listIsShown.value = !listIsShown.value;
  const showList = () => { listIsShown.value = true };
  const hideList = () => listIsShown.value = false;

  const getMapGestureBehaviour = (tentativeValue = 'greedy') => {
    return tentativeValue === 'cooperative' ? 'cooperative' : 'greedy';

  }
  const mapGestureBehaviour = ref(getMapGestureBehaviour(useRoute().query.gestureBehaviour as string));

  const selectedEstablishmentUuid = ref<string>();

  const route = useRoute();
  watch(route, () => {
    if (route.name === "establishment_detail") {
      selectedEstablishmentUuid.value = route.params.uuid as string;
    }
  });

  const mapStore = useMap();
  const { computeBoundingBox } = mapStore;

  const { setCenter, setZoom } = useMap();

  async function goToEstablishment(uuid: string, options?: { behaviourList?: 'show' | 'hide' }) {
    const establishment = await useApi().getEstablishmentByUuid(uuid).catch(/** Handle error(?) */)
    if (!establishment) return false

    setCenter(establishment.geoLocation)
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
    selectedEstablishmentUuid: selectedEstablishmentUuid,

    goToEstablishment,
    mapGestureBehaviour,
  }
});
