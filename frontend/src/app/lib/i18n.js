import moment from 'moment';
import i18n from 'i18next';
import Backend from 'i18next-chained-backend';
import XHRBackend from 'i18next-xhr-backend';
import LocalStorageCacheBackend from 'i18next-localstorage-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { FALLBACK_LANG, LOCALES, LOCALES_VERSIONS, I18N_CACHE_BACKEND_PREFIX } from 'app/constants/locales';
import { lazy, isDebug } from 'app/lib/utils';
import { i18nInit } from 'app/state/actions/ui';

const LazyPostProcessor = {
  type: 'postProcessor',
  name: 'LazyPostProcessor',
  process: function(value, key, options, translator) {
    console.log('woow');
    return value;
  }
};

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(LazyPostProcessor)
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
          // allow cross domain requests
          crossDomain: false,
          // allow credentials on cross domain requests
          withCredentials: false,
          // overrideMimeType sets request.overrideMimeType("application/json")
          overrideMimeType: true,
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

export function subscribe(store) {
  i18n.on('initialized', function() {
    store.dispatch(i18nInit());
  });
  i18n.on('missingKey', function(lngs, namespace, key, res) {
    if (store.getState().local.ui.i18n) {
      console.error(lngs, namespace, key, res);
    }
  });
}

export const _ = i18n.t.bind(i18n);
export const __ = lazy(_);
