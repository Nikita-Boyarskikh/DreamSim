const path = require('path');
const webpack = require('webpack');

const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');  Waiting until they upgrade lodash
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./config');

const isProduction = process.env.NODE_ENV === 'production';
const rootDir = path.resolve(__dirname, '..');

const webpackConfig = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: {
    app: path.resolve(rootDir, config.paths.src, config.indexJsx),
    vendors: path.resolve(rootDir, config.paths.src, config.vendors)
  },
  output: {
    path: path.resolve(rootDir, config.paths.dist),
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: ['node_modules', path.resolve(rootDir, config.paths.src)],
    extensions: ['.js', '.jsx', '.html', '.json'],
    unsafeCache: true,
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true
      })
    ]
  },
  plugins: [
    new GenerateSW({
      offlineGoogleAnalytics: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebPackPlugin({
      title: config.title,
      template: path.resolve(rootDir, config.paths.src, config.indexHtml),
      filename: path.resolve(rootDir, config.paths.dist, config.indexHtml),
      inject: true,
      hash: true,
      cache: true,
      showErrors: true,
      meta: config.meta,
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        : false,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ResourceHintWebpackPlugin(),
    // new FaviconsWebpackPlugin({
    //   logo: path.resolve(rootDir, config.paths.public, config.icons.logo),
    //   prefix: config.icons.prefix,
    //   title: config.paths.title,
    //   emitStats: false,
    //   statsFilename: 'iconstats-[hash].json',
    //   persistentCache: true,
    //   inject: true,
    //   background: config.icons.background,
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: true,
    //     windows: true,
    //   },
    // }),
    new AppCachePlugin({
      cache: [config.mediaRegex],
      network: null,
      settings: [],
      output: config.manifest.appcacheFilename
    }),
    new ManifestPlugin({
      fileName: path.resolve(
        rootDir,
        config.paths.public,
        config.manifest.json
      ),
      publicPath: config.manifest.publicName
    }),
    new CleanWebpackPlugin([config.paths.dist]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(sc|sa|c)ss$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          },
          {
            test: config.mediaRegex,
            use: {
              loader: 'url-loader',
              options: {
                name: config.paths.public + '/[path][name].[ext]?[hash:8]',
                limit: config.limits.urlLoaderLimit
              }
            }
          },
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: false
                }
              }
            ]
          },
          {
            test: /\.html$/,
            use: ['html-loader']
          },
          {
            exclude: /\.(js|jsx|html|json)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]?[hash:8]',
                outputPath: config.paths.assets + '/',
                publicPath: config.paths.public + '/'
              }
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: 'warning',
    maxAssetSize: config.limits.maxAssetSize,
    maxEntrypointSize: config.limits.maxEntrypointSize
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    },
    runtimeChunk: true
  }
};

module.exports = webpackConfig;
