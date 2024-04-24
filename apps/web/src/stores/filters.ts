import { useRouteQuery } from '@vueuse/router'
import { CATEGORIES, CURRENCIES } from 'database'
import type { Category, Currency, Location } from 'types'

export const useFilters = defineStore('filters', () => {
  const selectedCategoriesQuery = useRouteQuery<Category | Category[]>('categories')
  const selectedCategories = computed(() => {
    const c = selectedCategoriesQuery.value
    if (!c)
      return []
    const categoriesArray = Array.isArray(c) ? c : [c]
    return categoriesArray.filter(category => CATEGORIES.includes(category))
  })
  const selectedCurrenciesQuery = useRouteQuery<Currency | Currency[]>('currencies')
  const selectedCurrencies = computed(() => {
    const c = selectedCurrenciesQuery.value
    if (!c)
      return []
    const currenciesArray = Array.isArray(c) ? c : [c]
    return currenciesArray.filter(currency => CURRENCIES.includes(currency))
  })

  function setSelectedCurrencies(currencies: Currency[]) {
    selectedCurrenciesQuery.value = currencies
  }

  function setSelectedCategories(categories: Category[]) {
    selectedCategoriesQuery.value = categories
  }

  function includeLocation({ accepts, sells, category }: Location) {
    const currencies = accepts.concat(sells)
    const isFilteredByCurrencies = selectedCurrencies.value.length === 0 || currencies.some(currency => selectedCurrencies.value.includes(currency))
    const isFilteredByCategories = selectedCategories.value.length === 0 || selectedCategories.value.includes(category)
    return isFilteredByCurrencies && isFilteredByCategories
  }

  function filtersToString() {
    return {
      currencies: selectedCurrencies.value.sort().join(','),
      categories: selectedCategories.value.sort().join(','),
    } as const
  }

  return {
    selectedCategories,
    selectedCurrencies,
    setSelectedCurrencies,
    setSelectedCategories,
    filterLocations: (locations: Location[]) => locations.filter(includeLocation),
    filtersToString,
  }
})
