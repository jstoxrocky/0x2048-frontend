import * as types from './action-types';
import { newGame } from '../package/endpoints';

export default () => ({
  type: types.GET_NEW_GAME,
  payload: newGame(),
});
