import { LOCALES, LOCALES_VERSIONS } from 'app/constants/locales';
import { eqSet } from 'app/utils';
import { isDebug } from 'app/utils';

export function checkLocaleVersions() {
  if (!eqSet(
    new Set(Object.keys(LOCALES_VERSIONS)),
    new Set(LOCALES))
  ) {
    throw new Error('');
  }
}

if (isDebug) {
  checkLocaleVersions();
}
