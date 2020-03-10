import configureMockStore from 'redux-mock-store';
import fetchMock from 'tests/mocks/fetch';

import { getNormalizedInitialState } from 'app/lib/api';
import { commonMiddlewares } from 'app/state/store/configureStore.common';
import { initialize } from 'app/state/actions/db/initial';
import { LOGIN, LOADING_START, LOGIN_SUCCESS, GET_USER, SET_USER, LOAD_ENUMS, LOAD_TOOLS, SET_TOOLS } from 'app/constants/actionTypes';

describe('initialize', () => {
  const mockStore = configureMockStore(commonMiddlewares);

  afterEach(() => {
    fetchMock.restore();
  });

  test('should dispatch login, get current user and enums from API', async () => {
    const store = mockStore({
      user: { authKey: null },
      db: {
        user: {},
        enums: {
          tools: getNormalizedInitialState()
        }
      }
    });

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

    const expectedActions = [
      { type: LOGIN },
      { type: LOADING_START },
      { type: GET_USER },
      { type: LOADING_START },
      { type: LOAD_ENUMS },
      { type: LOAD_TOOLS },
      { type: LOADING_START },
      {
        type: LOGIN_SUCCESS,
        payload: {
          meta: undefined,
          entities: {
            authKey: {
              [authKey]: { key: authKey }
            }
          },
          result: authKey
        }
      },
      {
        type: SET_USER,
        payload: {
          meta: undefined,
          entities: {
            users: {
              [user.id]: user
            }
          },
          result: user.id
        }
      },
      {
        type: SET_TOOLS,
        payload: {
          meta: undefined,
          entities: {
            tools: {
              [tool.id]: tool
            },
          },
          result: [tool.id]
        }
      }
    ];

    await store.dispatch(initialize());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
