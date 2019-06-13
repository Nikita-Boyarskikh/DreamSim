import { createMiddleware } from 'redux-api-middleware';

export function checkResponse(response) {
  return response.ok && response.clone().json().then(json => !json.hasOwnProperty('error'));
}

export default createMiddleware({ ok: checkResponse, fetch: fetch });
