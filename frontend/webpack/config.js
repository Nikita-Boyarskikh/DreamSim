module.exports = {
  title: 'Circuit Design',
  mediaRegex: /\.(woff|woff2|ttf|eot|svg|png|jpe?g|gif|bmp)$/,
  indexHtml: 'index.html',
  indexJsx: 'index.jsx',
  vendors: 'vendors.js',
  paths: {
    dist: 'dist',
    src: 'src',
    public: 'public',
    assets: 'public'
  },
  icons: {
    prefix: 'icons/',
    background: '#fff',
    logo: 'logo.svg'
  },
  meta: {},
  manifest: {
    json: 'manifest.json',
    publicName: 'manifest.json',
    appcacheFilename: 'circuit-design-manifest.appcache'
  },
  devServer: {
    port: 8080,
    backend: {
      port: 3000,
      apiUrl: '/api'
    }
  },
  limits: {
    maxAssetSize: 2 * 1024 * 1024,
    maxEntrypointSize: 4 * 1024 * 1024,
    urlLoaderLimit: 128 * 1024
  }
};
