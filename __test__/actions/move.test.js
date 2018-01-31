import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../src/actions/action-types';
import move from '../../src/actions/move';
import * as endpoints from '../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
const direction = 'direction';
let store;

describe('hit move endpoint', () => {
  beforeEach(() => {
    store = mockStore({});
    sinon.stub(endpoints, 'move');
  });

  afterEach(() => {
    endpoints.move.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.MOVE_PENDING },
      { type: types.MOVE_FULFILLED, payload },
    ];
    endpoints.move.returns(Promise.resolve(payload));
    await store.dispatch(move(direction));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.MOVE_PENDING },
      { type: types.MOVE_REJECTED, payload, error: true },
    ];
    endpoints.move.returns(Promise.reject(payload));
    await store.dispatch(move(direction)).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
