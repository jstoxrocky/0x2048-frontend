import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../src/actions/action-types';
import pay from '../../src/actions/pay';
import * as endpoints from '../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;

describe('pay', () => {
  beforeEach(() => {
    store = mockStore({});
    sinon.stub(endpoints, 'pay');
  });

  afterEach(() => {
    endpoints.pay.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.PAY_PENDING },
      { type: types.PAY_FULFILLED, payload },
    ];
    endpoints.pay.returns(Promise.resolve(payload));
    await store.dispatch(pay());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.PAY_PENDING },
      { type: types.PAY_REJECTED, payload, error: true },
    ];
    endpoints.pay.returns(Promise.reject(payload));
    await store.dispatch(pay()).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
