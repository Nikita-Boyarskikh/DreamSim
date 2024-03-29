const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

process.env.NODE_ENV = 'development';

const config = require('./config');
const common = require('./webpack.config.common');

const devServerProxises = {};
devServerProxises[config.devServer.backend.apiUrl] =
  'http://localhost:' + config.devServer.backend.port;

const webpackConfig = {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: config.devServer.port,
    proxy: devServerProxises, // proxy URLs to backend development server
    contentBase: path.join(__dirname, '..', config.paths.public),
    publicPath: '/',
    useLocalIp: false,
    compress: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    https: false,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(common, webpackConfig);
