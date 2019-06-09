// TODO!
export default class Client {
  constructor(baseUrl, backend=FetchBackend) {
    this.baseUrl = baseUrl;
    this.backend = backend;
  }

  buildUrl(urlParts) {
    if
  }

  call({method='GET', url, headers={}, }) {
    return this.backend()
  }
};
