import React from 'react';
import fetchMock from 'tests/mocks/fetch';
import { render, cleanup } from '@testing-library/react';
import Index from 'app/components/Index';

describe('Index', () => {
  afterEach(() => {
    cleanup();
    fetchMock.restore();
  });

  test('should renders without errors and warnings', async () => {
    const { asFragment } = render(<Index/>);
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
