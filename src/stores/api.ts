import { fetchEstablishment, getCategories, getCurrencies, getEstablishments, getProviders, type BaseEstablishment, type Category, type Currency, type Provider } from "@/database";
import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useEstablishments } from "./establishments";
import { useMap } from "./map";

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAP_KEY


export const useApi = defineStore("api", () => {
  // Items that are loaded only once at the beginning
  const categories = ref<Map<string, Category>>(new Map());
  const currencies = ref<Map<string, Currency>>(new Map());
  const providers = ref<Map<string, Provider>>(new Map());

  const mapStore = useMap()
  const { boundingBox } = storeToRefs(mapStore)

  async function search() {
    const establishmentStore = useEstablishments()
    const { establishments } = storeToRefs(establishmentStore)

    const res = await getEstablishments(boundingBox.value)
    console.log('🔍 Fetched establishments from the API', res)

    res.filter((e) => !establishments?.value.has(e.uuid)) // ignore already loaded establishments
      .forEach((establishment) => establishments?.value.set(establishment.uuid, establishment))
  }

  async function getEstablishmentByUuid(uuid: string) {
    if (!uuid) return
    const { establishments } = storeToRefs(useEstablishments())

    const baseEstablishment = establishments.value.get(uuid) as BaseEstablishment;

    if (baseEstablishment?.hasAllInfo) return baseEstablishment

    const restOfEstablishment = await fetchEstablishment(uuid);
    if (!restOfEstablishment) return

    let url: string | undefined = undefined;
    if (restOfEstablishment.gmapsPlaceId) {
      url = `https://maps.google.com/?cid=${restOfEstablishment.gmapsPlaceId.trim()}`
    } else if (restOfEstablishment.instagram) {
      url = restOfEstablishment.instagram
    } else if (restOfEstablishment.facebook) {
      url = restOfEstablishment.facebook
    }

    const photo = restOfEstablishment.photo
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=540&photo_reference=${restOfEstablishment.photo}&key=${googleMapsKey}`
      : undefined

    const establishment = {
      ...baseEstablishment,
      ...restOfEstablishment,
      url,
      photo,
      hasAllInfo: true
    }

    console.log(`🔍 Got establishment with uuid ${uuid} from API: `, establishment)

    if (establishment) {
      establishments.value.set(uuid, establishment)
    }

    return establishment
  }

  async function fetchCategories() {
    const res: Category[] = await getCategories().catch((e) => e)
    console.log('🔍 Fetched categories from the API', res)
    if (res instanceof Error) {
      console.error(res);
      // TODO Handle error
      return;
    }

    const categoriesJson = res.reduce((acc, category) => {
      acc[category.label] = category
      return acc
    }, {} as Record<string, Category>)
    categories.value = new Map(Object.entries(categoriesJson))
  }

  async function fetchCurrencies() {
    const res: Currency[] = await getCurrencies().catch((e) => e)
    console.log('🔍 Fetched currencies from the API', res)
    if (res instanceof Error) {
      console.error(res);
      // TODO Handle error
      return;
    }

    const showFirst = ['NIM', 'BTC']
    const showLast = ['atm']

    const sortedCurrencies = res.sort((a, b) => {
      const aIndex = showFirst.indexOf(a.symbol)
      const bIndex = showFirst.indexOf(b.symbol)
      const aLastIndex = showLast.indexOf(a.symbol)
      const bLastIndex = showLast.indexOf(b.symbol)

      if (aIndex > -1 && bIndex > -1) return aIndex - bIndex
      if (aIndex > -1) return -1
      if (bIndex > -1) return 1
      if (aLastIndex > -1 && bLastIndex > -1) return aLastIndex - bLastIndex
      if (aLastIndex > -1) return 1
      if (bLastIndex > -1) return -1
      return 0
    })

    const currenciesJson = sortedCurrencies.reduce((acc, currency) => {
      acc[currency.symbol] = currency
      return acc
    }, {} as Record<string, Currency>)
    currencies.value = new Map(Object.entries(currenciesJson))
  }

  async function fetchProviders() {
    const res: Provider[] = await getProviders().catch((e) => e)
    console.log('🔍 Fetched providers from the API', res)
    if (res instanceof Error) {
      console.error(res);
      // TODO Handle error
      return;
    }

    const providersJson = res.reduce((acc, provider) => {
      acc[provider.name] = provider
      return acc
    }, {} as Record<string, Provider>)
    providers.value = new Map(Object.entries(providersJson))
  }

  watch([boundingBox], async () => await search())

  const loading = ref(true)

  onMounted(async () => {
    await Promise.all([
      fetchCategories(),
      fetchCurrencies()
    ])

    await fetchProviders()
    loading.value = false
  })

  return {
    search,
    categories,
    currencies,
    getEstablishmentByUuid,
    loading
  }
})
