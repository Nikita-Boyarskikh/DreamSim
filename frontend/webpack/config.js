module.exports = {
  title: 'DreamSim',
  mediaRegex: /\.(woff|woff2|ttf|eot|svg|png|jpe?g|gif|bmp)$/,
  indexHtml: 'index.html',
  indexJsx: 'index.jsx',
  vendors: 'vendors.js',
  paths: {
    dist: 'dist',
    src: 'src',
    public: 'public'
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
    appcacheFilename: 'dreamsim-manifest.appcache'
  },
  devServer: {
    port: 8080,
    backend: {
      port: 8000,
      apiUrl: '/api'
    }
  },
  limits: {
    maxAssetSize: 10 * 1024 * 1024,
    maxEntrypointSize: 15 * 1024 * 1024,
    urlLoaderLimit: 128 * 1024
  }
};
