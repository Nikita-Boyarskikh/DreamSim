const easingGradients = require('postcss-easing-gradients');
const autoPrefixer = require('autoprefixer');
const bem = require('postcss-bem');
const bemLinter = require('postcss-bem-linter');
const doiuse = require('doiuse');
const reporter = require('postcss-reporter');

const browsers = ['last 2 Chrome versions'];

module.exports = {
  plugins: [
    easingGradients(),
    autoPrefixer({ browsers }),
    bem({ style: 'bem' }),
    bemLinter('bem'),
    doiuse({ browsers }),
    reporter()
  ]
};
