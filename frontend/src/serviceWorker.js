import { isDebug } from 'app/utils';

export function register() {
  if (!isDebug && 'serviceWorker' in navigator) {
    const runtime = require('serviceworker-webpack-plugin/lib/runtime');
    window.addEventListener('load', () => {
      runtime.register();
    });
  }
}
