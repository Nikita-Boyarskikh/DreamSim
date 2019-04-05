process.env.NODE_ENV = 'production';

const common = require('./webpack.config.common');
const merge = require('webpack-merge');

const SafePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, config.paths.dist);
const publicDir = path.resolve(rootDir, config.paths.public);

const webpackConfig = {
  bail: true,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    },
    runtimeChunk: true,
    minimizer: [
      ...common.optimization.minimizer,
      new OptimizeCSSAssetsPlugin({
        parser: SafePostCssParser,
        map: {
          inline: false,
          annotation: true
        }
      })
    ]
  },
  plugins: [
    ...common.plugins,
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(publicDir, 'service-worker.js'),
    }),
    new AppCachePlugin({
      cache: [config.mediaRegex],
      network: null,
      settings: [],
      output: config.manifest.appcacheFilename
    }),
    new ManifestPlugin({
      fileName: path.resolve(
        distDir,
        config.manifest.json
      ),
      publicPath: config.manifest.publicName
    }),
    new CleanWebpackPlugin([config.paths.dist]),
  ]
};

module.exports = merge(common, webpackConfig);
