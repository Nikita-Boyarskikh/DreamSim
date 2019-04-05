import moment from 'moment';
import i18n from 'i18next';
import Backend from 'i18next-chained-backend';
import XHRBackend from 'i18next-xhr-backend';
import LocalStorageCacheBackend from 'i18next-localstorage-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { FALLBACK_LANG, LOCALES, LOCALES_VERSIONS } from 'app/constants/locales';
import { I18N_CACHE_BACKEND_PREFIX } from 'app/constants/locales';
import { isDebug } from 'app/utils';

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: FALLBACK_LANG,

    whitelist: LOCALES,
    nonExplicitWhitelist: true,

    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    keySeparator: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    saveMissing: isDebug,
    debug: isDebug,

    backend: {
      backends: [
        LocalStorageCacheBackend,
        XHRBackend
      ],
      backendOptions: [
        {
          prefix: I18N_CACHE_BACKEND_PREFIX,
          versions: LOCALES_VERSIONS,
        },
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
          addPath: '/locales/add/{{lng}}/{{ns}}',
          // allow cross domain requests
          crossDomain: false,

          // allow credentials on cross domain requests
          withCredentials: false,

          // overrideMimeType sets request.overrideMimeType("application/json")
          overrideMimeType: false,
        }]
    },
    react: {
      wait: true,
      bindI18n: 'loaded languageChanged',
      bindStore: 'onAdded onRemoved',
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    },
  })
  .catch(err => { console.error(err); });

i18n.on('languageChanged', function(lng) {
  moment.locale(lng);
});
