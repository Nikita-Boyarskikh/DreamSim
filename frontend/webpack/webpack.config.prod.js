process.env.NODE_ENV = 'production';

const path = require('path');
const merge = require('webpack-merge');

const SafePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const config = require('./config');
const common = require('./webpack.config.common');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, config.paths.dist);
const srcDir = path.resolve(rootDir, config.paths.src);

const webpackConfig = {
  bail: true,
  optimization: {
    nodeEnv: 'production',
    runtimeChunk: true,
    minimizer: [
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
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(srcDir, 'service-worker.js'),
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
    new CleanWebpackPlugin(),
  ]
};

module.exports = merge(common, webpackConfig);
