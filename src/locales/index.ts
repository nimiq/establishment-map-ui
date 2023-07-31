import en from './en.json';
import apiConstantsEn from './api-constants-en.json';
import providersEn from './providers-en.json';

import de from './de.json';
import apiConstantsDe from './api-constants-de.json';
import providersDe from './providers-de.json';

import es from './es.json';
import apiConstantsEs from './api-constants-es.json';
import providersEs from './providers-es.json';

export const messages = {
  en: {
    ...en,
    ...apiConstantsEn,
    providers: providersEn,
  },
  de: {
    ...de,
    ...apiConstantsDe,
    providers: providersDe,
  },
  es: {
    ...es,
    ...apiConstantsEs,
    providers: providersEs,
  },
}
