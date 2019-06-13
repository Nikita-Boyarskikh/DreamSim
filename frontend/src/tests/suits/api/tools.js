import configureMockStore from 'redux-mock-store';

import fetchMock from 'tests/mocks/fetch';

import { fetchTools } from 'app/state/actions/db/enums/tools';
import { commonMiddlewares } from 'app/state/store/configureStore.common';
import { LOADING_START, SET_TOOLS } from 'app/constants/actionTypes';

describe('/api/v1/enums/tools', () => {
  const mockStore = configureMockStore(commonMiddlewares);

  afterEach(() => {
    fetchMock.restore();
  });

  test('should dispatch LOADING_START, request api, dispatch SET_TOOLS with normalized data', async () => {
    const store = mockStore({ db: { enums: { tools: [] } } });
    const tool = { id: 1, name: 'TOOL', value: 'Tool name' };
    fetchMock.getOnce('/api/v1/enums/tools/', {
      body: [tool],
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: LOADING_START },
      {
        type: SET_TOOLS,
        payload: {
          meta: undefined,
          entities: {
            tools: {
              1: tool
            },
          },
          result: [1]
        }
      }
    ];

    await store.dispatch(fetchTools());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
