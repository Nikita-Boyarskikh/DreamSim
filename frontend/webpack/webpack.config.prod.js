process.env.NODE_ENV = 'production';

const common = require('./webpack.config.common');
const merge = require('webpack-merge');

const SafePostCssParser = require('postcss-safe-parser');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = {
  bail: true,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.jsx?$/,
        cache: true,
        parallel: true,
        uglifyOptions: {
          toplevel: true,
          ie8: true,
          compress: {
            drop_console: true,
            typeofs: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        parser: SafePostCssParser,
        map: {
          inline: false,
          annotation: true
        }
      })
    ]
  }
};

module.exports = merge(common, webpackConfig);
