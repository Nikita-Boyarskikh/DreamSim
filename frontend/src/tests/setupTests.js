// import jest from 'jest';
import 'isomorphic-fetch';
import fetchMock from './mocks/fetch';
import 'jest-dom/extend-expect';

global.console = {
  debug: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};
