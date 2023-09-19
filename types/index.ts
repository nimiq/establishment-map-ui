import type { Category, Currency } from './database.ts'

export * from './database.ts'
export * from './map.ts'
export * from './location.ts'
export * from './autocomplete.ts'

export enum Issue {
  LOCATION_GONE = 'location_gone',
  MISSING_CURRENCY = 'missing_currency',
  MISSING_NOT_ACCEPTED = 'missing_not_accepted',
  NO_CRYPTO = 'no_crypto',
  OTHER = 'other',
}

export interface Filters {
  categories: Category[]
  currencies: Currency[]
}

export interface CryptocityContent {
  name: string
  description: string[]
  url: string
}
