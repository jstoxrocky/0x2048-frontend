import { createStore } from 'redux';
import rootReducer from '../../../src/reducers/root-reducer';
import messageReducer from '../../../src/reducers/message-reducer';
import gameStateReducer from '../../../src/reducers/game-state-reducer';
import arcadeStateReducer from '../../../src/reducers/arcade-state-reducer';
import * as interfaces from '../../../src/package/interfaces';

const store = createStore(rootReducer);

describe('root reducer', () => {
  it('should return the the message reducer initial state', () => {
    const state = store.getState() as interfaces.Store;
    expect(state.message).toEqual(messageReducer(undefined, {}));
  });
  it('should return the the score reducer initial state', () => {
    const state = store.getState() as interfaces.Store;
    expect(state.game).toEqual(gameStateReducer(undefined, {}));
  });
  it('should return the the arcade state reducer initial state', () => {
    const state = store.getState() as interfaces.Store;
    expect(state.arcade).toEqual(arcadeStateReducer(undefined, {}));
  });
});
