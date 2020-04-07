const easingGradients = require('postcss-easing-gradients');
const autoPrefixer = require('autoprefixer');
const bem = require('postcss-bem');
const bemLinter = require('postcss-bem-linter');
const doiuse = require('doiuse');
const reporter = require('postcss-reporter');

const browsers = ['last 2 Chrome versions'];  // TODO: read from .browserslist

module.exports = {
  plugins: [
    easingGradients(),
    autoPrefixer(),
    bem({ style: 'bem' }),
    bemLinter('bem'),
    doiuse({ browsers }),
    reporter()
  ]
};
