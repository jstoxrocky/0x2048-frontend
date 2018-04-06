import * as types from './action-types';
import { move } from '../package/endpoints';

export default direction => ({
  type: types.MOVE,
  payload: move(direction),
});
