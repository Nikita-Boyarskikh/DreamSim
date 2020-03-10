import React from 'react';
import { render, cleanup } from '@testing-library/react';
import fetchMock from 'tests/mocks/fetch';

import Index from 'app/components/Index';

describe('Index', () => {
  afterEach(() => {
    cleanup();
    fetchMock.restore();
  });

  test('should renders without errors and warnings', async () => {
    const authKey = '1234567890-qwertyuiop-asdfghjkl-zxcvbnm';
    fetchMock.postOnce('/api/v1/auth/login/', {
      body: { key: authKey },
      headers: { 'content-type': 'application/json' }
    });

    const user = {
      id: 1,
      is_staff: true,
      username: 'durov',
      email: 'durov@vk.com',
      first_name: 'Павел',
      last_name: 'Дуров',
      patronymic: 'Валерьевич',
      group: 1,
      birthday: '1984-10-10',
      vk: 'https://vk.com/durov'
    };
    fetchMock.getOnce('/api/v1/user/current/', {
      body: user,
      headers: { 'content-type': 'application/json' }
    });

    const tool = { id: 1, name: 'TOOL', value: 'Tool name' };
    fetchMock.getOnce('/api/v1/enums/tools/', {
      body: [tool],
      headers: { 'content-type': 'application/json' }
    });

    const { asFragment } = render(<Index/>);
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
