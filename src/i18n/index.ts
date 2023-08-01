import en from './en.po';
import apiConstantsEn from './api-constants-en.json';
import providersEn from './providers-en.json';

import de from './de.po';
import apiConstantsDe from './api-constants-de.json';
import providersDe from './providers-de.json';

import es from './es.po';
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
