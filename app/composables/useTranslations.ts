import { Category, Currency, Issue } from 'types'
import { SUPPORTED_LANGUAGES, languagesLoaded } from '~~/i18n.config'

export function useTranslations() {
  const { defaultLocale, locale, t, setLocaleMessage } = useI18n()

  const cookie = useCookie('lang', { sameSite: 'lax', default: () => locale })

  /**
   * Load and enable new language 
   */
  async function setLanguage(lang: string) {
    if(!lang) return
    locale.value = !SUPPORTED_LANGUAGES.includes(lang) ? defaultLocale : lang
    if (!languagesLoaded.has(locale.value)) {
      const messages = await import(`@/assets/i18n/${locale.value}.po`).then(module => module.default)
      console.log(messages)
      setLocaleMessage(locale.value, messages)
      languagesLoaded.add(locale.value)
    }
    globalThis.document?.documentElement.setAttribute('lang', locale.value)
  }

  watch(locale, () => setLanguage(locale.value))

  /*
   * If the user changed the language in another window/tab then load and enable new language
   */
  function detectLanguage(): string {
    const lang = cookie.value || window.navigator.language.split('-')[0]
    return !lang || !SUPPORTED_LANGUAGES.includes(lang) ? defaultLocale : lang
  }

  function onTabFocus() {
    const lang = detectLanguage()
    if (locale.value !== lang) return
    setLanguage(lang)
  }

  useEventListener('focus', onTabFocus)

  function translateCategory(category?: Category) {
    switch (category) {
      case Category.CarsBikes: return t('Cars & Bikes')
      case Category.Cash: return t('Cash')
      case Category.ComputerElectronics: return t('Computer & Electronics')
      case Category.Entertainment: return t('Entertainment')
      case Category.FoodDrinks: return t('Food & Drinks')
      case Category.HealthBeauty: return t('Health & Beauty')
      case Category.HotelLodging: return t('Hotel & Lodging')
      case Category.LeisureActivities: return t('Leisure Activities')
      case Category.Miscellaneous: return t('Miscellaneous')
      case Category.RestaurantBar: return t('Restaurant & Bar')
      case Category.Shop: return t('Shop')
      case Category.SportsFitness: return t('Sports & Fitness')
      default:
        console.error(`Translation for category ${category} is missing`)
        return t('Miscellaneous')
    }
  }

  function translateIssue(issue: Issue) {
    switch (issue) {
      case Issue.LOCATION_GONE: return t('Location gone')
      case Issue.MISSING_CURRENCY: return t('Currency missing')
      case Issue.MISSING_NOT_ACCEPTED: return t('Currency not accepted')
      case Issue.NO_CRYPTO: return t('No crypto')
      case Issue.OTHER:
      default:
        return t('Other')
    }
  }

  function translateCurrency(currency: Currency) {
    switch (currency) {
      case Currency.BTC: return 'Bitcoin'
      case Currency.ETH: return 'Ethereum'
      case Currency.NIM: return 'Nimiq'
      case Currency.USDC_on_POLYGON: return t('USDC on POLYGON')
      case Currency.BINANCE_PAY: return t('Binance Pay')
      case Currency.BCH: return 'Bitcoin Cash'
      case Currency.DASH: return 'Dash'
      case Currency.LTC: return 'Litecoin'
      case Currency.LBTC: return 'Lightning Bitcoin'
      case Currency.XLM: return 'Stellar'
      case Currency.XRP: return 'Ripple'
    }
  }

  return {
    setLanguage,
    detectLanguage,
    translateCategory,
    translateIssue,
    translateCurrency,
  }
}
