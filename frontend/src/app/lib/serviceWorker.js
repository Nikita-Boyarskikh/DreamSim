import { isProduction } from 'app/lib/utils';

export function register() {
  if (isProduction && 'serviceWorker' in navigator) {
    const runtime = require('serviceworker-webpack-plugin/lib/runtime');
    window.addEventListener('load', () => {
      runtime.register();
    });
  }
}
