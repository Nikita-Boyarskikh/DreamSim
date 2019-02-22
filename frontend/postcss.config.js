const easingGradients = require('postcss-easing-gradients');
const autoPrefixer = require('autoprefixer');
const bem = require('postcss-bem');
const bemLinter = require('postcss-bem-linter');
const immutableCss = require('immutable-css');
const doiuse = require('doiuse');
const reporter = require('postcss-reporter');

const browsers = [];

module.exports = {
  plugins: [
    easingGradients(),
    autoPrefixer({ browsers }),
    bem({ style: 'bem' }),
    bemLinter('bem'),
    immutableCss({ strict: true, }),
    doiuse({ browsers }),
    reporter(),
  ]
};
