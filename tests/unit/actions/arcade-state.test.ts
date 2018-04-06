import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../../src/actions/action-types';
import getArcadeState from '../../../src/actions/arcade-state';
import * as endpoints from '../../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;
let stubGetArcadeState;

describe('get arcade state', () => {
  beforeEach(() => {
    store = mockStore({});
    stubGetArcadeState = sinon.stub(endpoints, 'getArcadeState');
  });

  afterEach(() => {
    stubGetArcadeState.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.GET_ARCADE_STATE_PENDING },
      { type: types.GET_ARCADE_STATE_FULFILLED, payload },
    ];
    stubGetArcadeState.returns(Promise.resolve(payload));
    await store.dispatch(getArcadeState());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.GET_ARCADE_STATE_PENDING },
      { type: types.GET_ARCADE_STATE_REJECTED, payload, error: true },
    ];
    stubGetArcadeState.returns(Promise.reject(payload));
    await store.dispatch(getArcadeState()).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
