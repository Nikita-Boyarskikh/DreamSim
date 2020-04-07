const path = require('path');
const webpack = require('webpack');

const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');  Waiting until they upgrade lodash
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config');

const isProduction = process.env.NODE_ENV === 'production';
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, config.paths.src);
const distDir = path.resolve(rootDir, config.paths.dist);

const webpackConfig = {
  mode: process.env.NODE_ENV,
  cache: true,
  target: 'web',
  entry: {
    app: path.resolve(srcDir, config.indexJsx),
    vendors: path.resolve(srcDir, config.vendors)
  },
  output: {
    path: distDir,
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: ['node_modules', srcDir],
    extensions: ['.js', '.jsx', '.html', '.json'],
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebPackPlugin({
      title: config.title,
      template: path.resolve(srcDir, config.indexHtml),
      filename: path.resolve(distDir, config.indexHtml),
      inject: true,
      hash: true,
      cache: true,
      showErrors: true,
      meta: config.meta,
      minify: isProduction && {
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
      },
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
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
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    includePaths: [srcDir]
                  }
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: [
              'svg-sprite-loader',
              {
                loader: 'svgo-loader',
                options: {
                  full: true,
                  plugins: [
                    'cleanupAttrs',
                    'inlineStyles',
                    'removeDoctype',
                    'removeXMLProcInst',
                    'removeComments',
                    'removeMetadata',
                    'removeTitle',
                    'removeDesc',
                    'removeUselessDefs',
                    'removeEditorsNSData',
                    'removeEmptyAttrs',
                    'removeHiddenElems',
                    'removeEmptyText',
                    'removeEmptyContainers',
                    'cleanupEnableBackground',
                    'minifyStyles',
                    'convertStyleToAttrs',
                    'convertColors',
                    'convertPathData',
                    'convertTransform',
                    'removeUnknownsAndDefaults',
                    'removeNonInheritableGroupAttrs',
                    'removeUselessStrokeAndFill',
                    'removeUnusedNS',
                    'prefixIds',
                    'cleanupIDs',
                    'cleanupNumericValues',
                    'cleanupListOfValues',
                    'moveElemsAttrsToGroup',
                    'moveGroupAttrsToElems',
                    'collapseGroups',
                    'mergePaths',
                    'convertShapeToPath',
                    'removeDimensions'
                  ]
                }
              },
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
                outputPath: config.paths.public + '/',
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
    minimizer: [
      new TerserPlugin({
        test: /\.jsx?$/,
        cache: true,
        parallel: true,
        sourceMap: !isProduction,
        terserOptions: {
          warnings: false,
          toplevel: true,
          ie8: true,
          compress: {
            drop_console: isProduction,
            drop_debugger: isProduction,
            typeofs: false
          },
          output: {
            comments: !isProduction,
            webkit: true
          }
        }
      })
    ]
  }
};

module.exports = webpackConfig;
