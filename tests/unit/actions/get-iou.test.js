import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../../src/actions/action-types';
import getIOU from '../../../src/actions/get-iou';
import * as endpoints from '../../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;

describe('GET /iou endpoint', () => {
  beforeEach(() => {
    store = mockStore({});
    sinon.stub(endpoints, 'getIOU');
  });

  afterEach(() => {
    endpoints.getIOU.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.GET_IOU_PENDING },
      { type: types.GET_IOU_FULFILLED, payload },
    ];
    endpoints.getIOU.returns(Promise.resolve(payload));
    await store.dispatch(getIOU());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.GET_IOU_PENDING },
      { type: types.GET_IOU_REJECTED, payload, error: true },
    ];
    endpoints.getIOU.returns(Promise.reject(payload));
    await store.dispatch(getIOU()).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
