import { combineReducers } from 'redux';
import gameStateReducer from './game-state-reducer';
import messageReducer from './message-reducer';
import arcadeStateReducer from './arcade-state-reducer';

export default combineReducers({
  message: messageReducer,
  arcade: arcadeStateReducer,
  game: gameStateReducer,
});
