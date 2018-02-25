import { createStore } from 'redux';
import rootReducer from '../../../src/reducers/root-reducer';
import messageReducer from '../../../src/reducers/message-reducer';
import gameStateReducer from '../../../src/reducers/game-state-reducer';
import arcadeStateReducer from '../../../src/reducers/arcade-state-reducer';
import paymentReducer from '../../../src/reducers/payment-reducer';

const store = createStore(rootReducer);

describe('root reducer', () => {
  it('should return the the message reducer initial state', () => {
    expect(store.getState().message).toEqual(messageReducer(undefined, {}));
  });
  it('should return the the score reducer initial state', () => {
    expect(store.getState().game).toEqual(gameStateReducer(undefined, {}));
  });
  it('should return the the arcade state reducer initial state', () => {
    expect(store.getState().arcade).toEqual(arcadeStateReducer(undefined, {}));
  });
  it('should return the the payment reducer initial state', () => {
    expect(store.getState().payment).toEqual(paymentReducer(undefined, {}));
  });
});
