import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translations/en.json';
import translationHI from './translations/hi.json';
import translationMR from './translations/mr.json';

const resources = {
  EN: { translation: translationEN },
  HI: { translation: translationHI },
  MR: { translation: translationMR }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'EN',
  fallbackLng: 'EN',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
