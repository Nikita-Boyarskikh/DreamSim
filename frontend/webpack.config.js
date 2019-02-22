const isProduction = process.env.NODE_ENV === 'production';
module.exports = isProduction
  ? require('./webpack/webpack.config.prod')
  : require('./webpack/webpack.config.dev');
