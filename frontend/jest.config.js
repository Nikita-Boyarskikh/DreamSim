const webpackConfig = require('./webpack.config');

module.exports = {
  browser: true,
  clearMocks: true,
  moduleDirectories: webpackConfig.resolve.modules,
  moduleFileExtensions: webpackConfig.resolve.extensions.map((ext) =>
    ext.replace('.', '')
  ),
  roots: ['<rootDir>/src/tests'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coverageReporters: ['text-summary', 'json', 'html', 'lcov'],
  timers: 'fake',
  errorOnDeprecated: true,
  testMatch: ['<rootDir>/src/tests/suits/**/*.{js,jsx}'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  testEnvironment: 'jsdom',
  testURL: 'https://drsim.ru',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/src/tests/transformers/cssTransformer.js',
    '^(?!.*\\.(js|jsx|css|json)$)':
      '<rootDir>/src/tests/transformers/fileTransformer.js'
  }
};
