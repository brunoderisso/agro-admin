import i18next from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslations from '../locale/en.json'
import esTranslations from '../locale/es.json'
import ptTranslations from '../locale/pt.json'

i18next.use(initReactI18next).init({
  resources: {
    pt: {
      ...ptTranslations
    },
    en: {
      ...enTranslations
    },
    es: {
      ...esTranslations
    }
  },
  lng: 'pt'
})