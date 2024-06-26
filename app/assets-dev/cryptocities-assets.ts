import type { CryptocityUI } from 'types'
import { Cryptocity } from 'types'

// Note that description is defined as a getter to be able to use the i18nKeyPassThrough, as the actual translation
// for providerLabel is happening in i18n-t in MapMarkers
export const cryptocitiesUi: Record<Cryptocity, CryptocityUI> = {
  [Cryptocity.SanJose]: {
    name: 'Criptociudad San José',
    get description() {
      return [
        useI18n().t('Criptociudad San José is part of the global Cryptocity Initiative led by Nimiq and its partners.'),
        useI18n().t('We are strategically working with local businesses to stimulate the regional economy through the innovative use of cryptocurrency.'),
        useI18n().t('Learn more at'),
      ]
    },
    url: 'https://www.criptociudad.cr/',
    showCardAtZoom: 11,
  },

  [Cryptocity.Mannheim]: {
    name: 'Kryptostadt Mannheim',
    get description() {
      return [
        useI18n().t('Kryptostadt Mannheim is part of the global Cryptocity Initiative led by Nimiq and its partners.'),
        useI18n().t('We are strategically working with local businesses to stimulate the regional economy through the innovative use of cryptocurrency.'),
        useI18n().t('Learn more at'),
      ]
    },
    url: 'https://kryptostadt.info/',
    showCardAtZoom: 12,
  },

  [Cryptocity.Ljubljana]: {
    name: 'Ljubljana',
    get description() {
      return [
        useI18n().t('Thanks to GoCrypto, Slovenia\'s capital, Ljubljana, has become a top destination for crypto enthusiasts.'),
        useI18n().t('With over 600 acceptance locations, Ljubljana not only stands as the most crypto-friendly city in Europe but also secures a prominent position in international rankings.'),
        useI18n().t('Learn more at'),
      ]
    },
    url: 'https://gocrypto.com/blog',
    showCardAtZoom: 11,
  },
}
