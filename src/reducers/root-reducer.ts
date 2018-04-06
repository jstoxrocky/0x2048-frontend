import { combineReducers } from 'redux';
import arcadeStateReducer from './arcade-state-reducer';
import gameStateReducer from './game-state-reducer';
import messageReducer from './message-reducer';

const combinedReducers: any = combineReducers({
  arcade: arcadeStateReducer,
  game: gameStateReducer,
  message: messageReducer,
});

export default combinedReducers;
