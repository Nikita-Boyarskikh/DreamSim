switch (process.env.NODE_ENV) {
  case 'development':
    module.exports = require('./webpack/webpack.config.dev');
    break;
  case 'test':
    module.exports = require('./webpack/webpack.config.test');
    break;
  case 'production':
    module.exports = require('./webpack/webpack.config.prod');
    break;
  default:
    throw Error(`Only "development"/"test"/"production" environments allowed, but NODE_ENV="${process.env.NODE_ENV}"`);
}
