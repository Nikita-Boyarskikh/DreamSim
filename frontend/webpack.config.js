switch (process.env.NODE_ENV) {
  case 'test':
    module.exports = require('./webpack/webpack.config.test');
    break;
  case 'production':
    module.exports = require('./webpack/webpack.config.prod');
    break;
  default:  // development
    module.exports = require('./webpack/webpack.config.dev');
    break;
}
