import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import promise from 'redux-promise-middleware';
import * as types from '../../../src/actions/action-types';
import newGame from '../../../src/actions/new-game';
import * as endpoints from '../../../src/package/endpoints';

const middlewares = [promise()];
const mockStore = configureMockStore(middlewares);
const payload = 'PAYLOAD';
let store;
let stubNewGame;

describe('Get new game', () => {
  beforeEach(() => {
    store = mockStore({});
    stubNewGame = sinon.stub(endpoints, 'newGame');
  });

  afterEach(() => {
    stubNewGame.restore();
  });

  it('should succeed', async () => {
    const expectedActions = [
      { type: types.GET_NEW_GAME_PENDING },
      { type: types.GET_NEW_GAME_FULFILLED, payload },
    ];
    stubNewGame.returns(Promise.resolve(payload));
    await store.dispatch(newGame());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail', async () => {
    const expectedActions = [
      { type: types.GET_NEW_GAME_PENDING },
      { type: types.GET_NEW_GAME_REJECTED, payload, error: true },
    ];
    stubNewGame.returns(Promise.reject(payload));
    await store.dispatch(newGame()).catch(e => (e));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
