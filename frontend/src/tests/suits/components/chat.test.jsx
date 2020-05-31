import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Chat from 'app/components/Chat/Chat';

describe('Chat', () => {
  afterEach(() => {
    cleanup();
  });

  test('should renders without errors and warnings', () => {
    const { asFragment } = render(<Chat/>);
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
