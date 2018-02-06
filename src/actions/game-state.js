import * as types from './action-types';
import { gameState } from '../package/endpoints';

export default () => ({
  type: types.GET_GAME_STATE,
  payload: gameState(),
});
