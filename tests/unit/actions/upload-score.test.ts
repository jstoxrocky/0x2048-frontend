import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../../src/actions/action-types';
import uploadScore from '../../../src/actions/upload-score';
import * as endpoints from '../../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;
let stubUploadScore;

describe('uploadScore', () => {
  beforeEach(() => {
    store = mockStore({});
    stubUploadScore = sinon.stub(endpoints, 'uploadScore');
  });

  afterEach(() => {
    stubUploadScore.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.UPLOAD_PENDING },
      { type: types.UPLOAD_FULFILLED, payload },
    ];
    stubUploadScore.returns(Promise.resolve(payload));
    const v = '0x00';
    const r = '0x00';
    const s = '0x00';
    const score = 1;
    const recoveredAddress = '0x00';
    await store.dispatch(uploadScore(v, r, s, recoveredAddress, score));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.UPLOAD_PENDING },
      { type: types.UPLOAD_REJECTED, payload, error: true },
    ];
    stubUploadScore.returns(Promise.reject(payload));
    const v = '0x00';
    const r = '0x00';
    const s = '0x00';
    const score = 1;
    const recoveredAddress = '0x00';
    await store.dispatch(uploadScore(v, r, s, recoveredAddress, score)).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
