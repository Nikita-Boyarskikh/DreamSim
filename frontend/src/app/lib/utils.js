export function eqSet(a, b) {
  return a.size === b.size && all(isIn(b), a);
}

export function all(pred, a) {
  for (let el of a) {
    if (!pred(el)) {
      return false;
    }
  }
  return true;
}

export function isIn(a) {
  return function(el) {
    return a.has(el);
  };
}

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isTesting = process.env.NODE_ENV === 'test';

export const lazy = (func) => (...args) => () => func(...args);
export const unlazy = (lazy) => ((typeof lazy === 'function') ? lazy() : lazy);
