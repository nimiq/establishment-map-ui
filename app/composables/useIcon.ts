// @unocss-include

const categoryIconCatalog: Record<CategoryType, string> = {
  cars_bikes: 'i-nimiq:front-car',
  cash: 'i-nimiq:cash',
  computer_electronics: 'i-nimiq:screen-monitor',
  entertainment: 'i-nimiq:cinema-tickets',
  food_drinks: 'i-nimiq:burger',
  health_beauty: 'i-nimiq:health-cross',
  hotel_lodging: 'i-nimiq:bed',
  leisure_activities: 'i-nimiq:racket-sport',
  miscellaneous: 'i-nimiq:question-mark',
  restaurant_bar: 'i-nimiq:fork-knife',
  shop: 'i-nimiq:shopping-bag',
  sports_fitness: 'i-nimiq:basketball',
}

export function getCategoryIcon(category: CategoryType) {
  const iconName = categoryIconCatalog[category]
  return iconName
}

const cryptoIconCategory: Omit<Record<CurrencyType, string>, 'BINANCE_PAY'> = {
  NIM: 'i-nimiq:logos-nimiq',
  BTC: 'i-cryptocurrency-color:btc',
  ETH: 'i-cryptocurrency-color:eth',
  DASH: 'i-cryptocurrency-color:dash',
  LTC: 'i-cryptocurrency-color:ltc',
  BCH: 'i-cryptocurrency-color:bch',
  LBTC: 'i-nimiq:logos-lbtc',
  USDT: 'i-nimiq:logos-usdt',
  USDC_on_POLYGON: 'i-cryptocurrency-color:usdc',
  XLM: 'i-cryptocurrency-color:xlm',
  XRP: 'i-cryptocurrency-color:xrp',
}

export function getCurrencyIcon(currency: Exclude<CurrencyType, 'BINANCE_PAY'>) {
  const iconName = cryptoIconCategory[currency]
  return iconName
}

// const bannerIconCategory: Record<LocationBanner, string> = {
//   [Provider.Edenia]: 'i-providers:edenia',
//   [Provider.Bluecode]: 'i-providers:bluecode',
//   [Provider.CryptopaymentLink]: 'i-providers:cpl',
//   [Provider.Kurant]: 'i-providers:kurant',
//   [Provider.NAKA]: 'i-providers:naka',
//   'Nimiq-Pay': 'i-nimiq:logos-nimiq-pay-vertical',
//   'DefaultAtm': 'i-providers:default-atm',
//   'None': '',
// }

// export function getBannerIcon(provider: LocationBanner) {
//   const iconName = bannerIconCategory[provider]
//   return iconName
// }
