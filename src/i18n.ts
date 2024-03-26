import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const options = {
  lng: localStorage.getItem('preferredLanguage') || 'EN',
  fallbackLng: 'EN',
  interpolation: {
    escapeValue: false
  }
};

i18n
  .use(resourcesToBackend((language: string) => import(`./translations/${language}.json`)))
  .init(options);

i18n.on('languageChanged', () => {
  document.body.dir = i18n.dir();
});

export default i18n;
