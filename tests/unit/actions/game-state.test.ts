import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../../src/actions/action-types';
import gameState from '../../../src/actions/game-state';
import * as endpoints from '../../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;
let stubGameState;

describe('hit gamestate endpoint', () => {
  beforeEach(() => {
    store = mockStore({});
    stubGameState = sinon.stub(endpoints, 'gameState');
  });

  afterEach(() => {
    stubGameState.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.GET_GAME_STATE_PENDING },
      { type: types.GET_GAME_STATE_FULFILLED, payload },
    ];
    stubGameState.returns(Promise.resolve(payload));
    await store.dispatch(gameState());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.GET_GAME_STATE_PENDING },
      { type: types.GET_GAME_STATE_REJECTED, payload, error: true },
    ];
    stubGameState.returns(Promise.reject(payload));
    await store.dispatch(gameState()).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
