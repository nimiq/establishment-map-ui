import { i18n } from '@/i18n/i18n-setup'
import { Provider, Theme } from '@/types'
import type { Location } from '@/types'

export const providersAssets: Record<Provider, Pick<Location, 'bg' | 'bgFullCard' | 'theme' | 'providerLabel' | 'providerTooltip' | 'providerTooltipCta'>> = {
  [Provider.DefaultShop]: {
    bg: 'white',
    bgFullCard: false,
    theme: Theme.Light,

  },
  [Provider.DefaultAtm]: {
    theme: Theme.Dark,
    bgFullCard: true,
    bg: 'radial-gradient(100% 100% at 100% 100%, #4D4C96 0%, #5F4B8B 100%)',
  },
  [Provider.GoCrypto]: {
    theme: Theme.Light,
    bgFullCard: false,
    bg: '#F0BF4C',
    get providerLabel() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Powered by {provider}')
      return 'Powered by {provider}'
    },
    get providerTooltip() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('GoCrypto is a global payment network that enables merchants to accept crypto payments.')
      return i18n.t('GoCrypto is a global payment network that enables merchants to accept crypto payments.')
    },
    providerTooltipCta: 'https://gocrypto.com',
  },
  [Provider.Kurant]: {
    theme: Theme.Dark,
    bgFullCard: true,
    bg: '#A92E19',
    get providerLabel() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Register with {provider}')
      return 'Register with {provider}'
    },
    get providerTooltip() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Kurant enables users to easily purchase cryptocurrencies through a network of ATMs.')
      return i18n.t('Kurant enables users to easily purchase cryptocurrencies through a network of ATMs.')
    },
    providerTooltipCta: 'https://kurant.net',
  },
  [Provider.Bluecode]: {
    bg: '#004899',
    bgFullCard: false,
    theme: Theme.Dark,
    get providerLabel() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Powered by {provider}')
      return 'Powered by {provider}'
    },
    get providerTooltip() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Bluecode is a payment method that allows secure transactions directly through the smartphone.')
      return 'Bluecode is a payment method that allows secure transactions directly through the smartphone.'
    },
    providerTooltipCta: 'https://bluecode.com',
  },
  [Provider.CryptopaymentLink]: {
    bg: '#5C6CFF',
    theme: Theme.Dark,
    bgFullCard: false,
    get providerLabel() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Powered by {provider}')
      return 'Powered by {provider}'
    },
    get providerTooltip() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('With CryptoPayment Link, you can quickly and easily receive cryptocurrency payments from your customers.')
      return 'With CryptoPayment Link, you can quickly and easily receive cryptocurrency payments from your customers.'
    },
    providerTooltipCta: 'https://cplink.com',
  },
  [Provider.Edenia]: {
    bg: '#00B2B0',
    theme: Theme.Dark,
    bgFullCard: true,
    get providerLabel() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Register with {provider}')
      return 'Register with {provider}'
    },
    get providerTooltip() {
      // @ts-expect-error Must write out the translation key so it can be extracted by the i18n plugin
      const translation = i18n.t('Edenia enables users to easily purchase cryptocurrencies through a network of ATMs')
      return 'Edenia enables users to easily purchase cryptocurrencies through a network of ATMs'
    },
  },

  // TODO
  [Provider.CryptoCR]: {
    theme: Theme.Light,
    bgFullCard: false,
    bg: 'pink',
  },
}
