import { LOCALES, LOCALES_VERSIONS } from 'app/constants/locales';
import { eqSet } from 'app/lib/utils';
import { isProduction } from 'app/lib/utils';

export function checkLocaleVersions() {
  if (!eqSet(
    new Set(Object.keys(LOCALES_VERSIONS)),
    new Set(LOCALES))
  ) {
    throw new Error('');
  }
}

if (!isProduction) {
  checkLocaleVersions();
}
