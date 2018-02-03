import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../src/actions/action-types';
import uploadScore from '../../src/actions/upload-score';
import * as endpoints from '../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;

describe('uploadScore', () => {
  beforeEach(() => {
    store = mockStore({});
    sinon.stub(endpoints, 'uploadScore');
  });

  afterEach(() => {
    endpoints.uploadScore.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.UPLOAD_PENDING },
      { type: types.UPLOAD_FULFILLED, payload },
    ];
    endpoints.uploadScore.returns(Promise.resolve(payload));
    await store.dispatch(uploadScore());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.UPLOAD_PENDING },
      { type: types.UPLOAD_REJECTED, payload, error: true },
    ];
    endpoints.uploadScore.returns(Promise.reject(payload));
    await store.dispatch(uploadScore()).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
