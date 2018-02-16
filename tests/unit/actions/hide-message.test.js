import configureMockStore from 'redux-mock-store';
import * as types from '../../../src/actions/action-types';
import hideMessage from '../../../src/actions/hide-message';

const mockStore = configureMockStore();
const store = mockStore({});

describe('hide message', () => {
  it('should succeed', async () => {
    const expectedActions = [
      { type: types.HIDE_MESSAGE },
    ];
    store.dispatch(hideMessage());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
