import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../src/actions/action-types';
import adjustPrice from '../../src/actions/adjust-price';
import * as endpoints from '../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;

describe('adjust price', () => {
  beforeEach(() => {
    store = mockStore({});
    sinon.stub(endpoints, 'adjustPrice');
  });

  afterEach(() => {
    endpoints.adjustPrice.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.ADJUST_PRICE_PENDING },
      { type: types.ADJUST_PRICE_FULFILLED, payload },
    ];
    endpoints.adjustPrice.returns(Promise.resolve(payload));
    await store.dispatch(adjustPrice());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.ADJUST_PRICE_PENDING },
      { type: types.ADJUST_PRICE_REJECTED, payload, error: true },
    ];
    endpoints.adjustPrice.returns(Promise.reject(payload));
    await store.dispatch(adjustPrice()).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
