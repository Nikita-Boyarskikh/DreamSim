import { LOCALES, LOCALES_VERSIONS } from 'app/constants/locales';
import { eqSet } from 'app/lib/utils';
import { isDebug } from 'app/lib/utils';

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
